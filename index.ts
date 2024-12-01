const test = "Hello World";

export function hello(who: string = test): string {
    return `Hello ${who}`;
}