import { Command } from '@oclif/core';
export default class Vendor extends Command {
    static description: string;
    static examples: string[];
    run(): Promise<void>;
}
