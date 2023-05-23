set -e

function info {
    echo "$(tput setaf 6)$1$(tput sgr0)"
}

function error {
    echo "$(tput setaf 1)$1$(tput sgr0)"
}

if [ ! -d "dist" ]; then
    error "Run 'yarn build' first"
    exit 1
fi

TARGETS=(
    "../ideless.github.io"
    "../ideless"
)

for TARGET in "${TARGETS[@]}"; do
    if [ ! -d "${TARGET}" ]; then
        error "Target ${TARGET} does not exist, skipped"
        continue
    fi
    info "Deploying to ${TARGET}"
    rm -rf "${TARGET}/artifact"
    cp -r dist/ "${TARGET}/artifact"
    pushd "${TARGET}"
    if [ -n "$(git status --porcelain)" ]; then
        git add *
        git commit -m "update artifact"
        git push -f
    else
        info "No changes, skipped"
    fi
    popd
done
