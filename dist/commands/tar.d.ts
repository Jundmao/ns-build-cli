import { Command } from '@oclif/core';
export default class Tar extends Command {
    static description: string;
    run(): Promise<void>;
}
