# Advent of Code - TypeScript Setup

## Quick Start

### Create a new day solution

```bash
npm run scaffold 2025 04
```

### Run a solution

```bash
# Simple syntax
npm run 2025 03
npm run 2024 01

# Or run any TypeScript file directly
npm run dev -- 2025/TypeScript/03/solution.ts
```

### Run tests

```bash
npm test
```

## Workflow

1. **Scaffold a new day**: Creates all necessary files with templates

    ```bash
    npm run scaffold 2025 04
    ```

    This creates:

    - `solution.ts` - Main solution file with template
    - `helpers.ts` - Helper functions
    - `helpers.test.ts` - Test file
    - `input.txt` - Empty file for puzzle input

2. **Add your puzzle input** to `input.txt`

3. **Implement your solution** in `solution.ts`

4. **Run your solution**:

    ```bash
    npm run 2025 04
    ```

5. **Add tests** in `helpers.test.ts` and run them:

    ```bash
    npm test
    ```

## File Structure

```txt
2025/
  TypeScript/
    01/
      solution.ts
      helpers.ts
      helpers.test.ts
      input.txt
    02/
      ...
```

## Available Scripts

-   `npm start` - Run ALL solutions (all years and days in order)
-   `npm run scaffold <year> <day>` - Create new day template
-   `npm run 2025 <day>` - Run 2025 solution (e.g., `npm run 2025 03`)
-   `npm run 2024 <day>` - Run 2024 solution (e.g., `npm run 2024 01`)
-   `npm test` - Run all tests
