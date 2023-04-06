import { Artifact } from "@/ys/artifact";
import { CharacterData, ArtifactData } from "@/ys/data";
import { choice } from "@/ys/utils";

// const charKeys = ["Traveler"].concat(
//     Object.keys(CharacterData).filter((k) => !k.startsWith("Traveler"))
// );

const charKeys = ["Kirara", "Dehya", "Mika", "Kaveh", "Baizhu"];

const testArts =
    process.env.NODE_ENV == "development"
        ? charKeys.map((key) => {
              let a = Artifact.rand({ set: choice(ArtifactData.setKeys) });
              a.location = key;
              return a;
          })
        : [];

export { testArts };
