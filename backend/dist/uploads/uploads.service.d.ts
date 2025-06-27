export declare class UploadsService {
    prepareFile(uploadedFilePath: string, originalFileName: string): Promise<{
        publicUrl: string;
        fileName: string;
        originalName: string;
    }>;
}
