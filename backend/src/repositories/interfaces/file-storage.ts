export interface FileStorage {
  save(buffer: Buffer, originalName: string, mimetype: string): Promise<string>;
  delete(filePath: string): Promise<void>;
}
