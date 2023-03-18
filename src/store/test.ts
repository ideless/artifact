import { Artifact } from "@/ys/artifact";
import { CharacterData, ArtifactData } from "@/ys/data";

const charKeys = ["Traveler"].concat(
    Object.keys(CharacterData).filter((k) => !k.startsWith("Traveler"))
);

const testArts =
    process.env.NODE_ENV == "development"
        ? charKeys.map((key) => {
              let a = Artifact.rand({ sets: ArtifactData.setKeys });
              a.location = key;
              return a;
          })
        : [];

export { testArts };
