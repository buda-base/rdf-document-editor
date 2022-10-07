declare module "jsewts" {
  export function toWylie(str: string, escape?: boolean, warns?: Array<string>): string
  export function fromWylie(str: string, opts?: Record<string, unknown>, warns?: Array<string>): string
}
