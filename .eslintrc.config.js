import love from "eslint-config-love";
import pluginReact from "eslint-plugin-react";
import globals from "globals";

export default [
  // 1. Inherit the modern "Standard with TypeScript" (eslint-config-love) rules
  {
    ...love,
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
  },

  // 2. Inherit the standard React rules
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"], // Optional: turns off old "React must be in scope" errors

  // 3. Apply your custom environments, parsing context, and overrides
  {
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      // Replaces "env": { "browser": true }
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        // Automatically reads your local tsconfig.json file
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: "detect", // Automatically matches your current installed React version
      },
    },
    // Replaces your custom "rules" object
    rules: {
      "@typescript-eslint/strict-boolean-expressions": "warn",
      "@typescript-eslint/indent": "off",
    },
  },
];
