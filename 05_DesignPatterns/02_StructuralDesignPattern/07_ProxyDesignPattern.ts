/**
 * 
 * Proxy design pattern is used when we need to substitute the main object with another proxy object,
 * the role of this proxy object can may be to provide access to this main object, or to delay the object
 * creation etc.
 * 
 * Lets understand this with help of an example, say I have a file system such that only specific role
 * users can open the file. In this situation we provide a proxy object to the main file and check if the
 * user is authorized to open the file or not, if not he simply will not be given access to open the file.
 * 
 * Lets see the code for this
 * 
 * So we have a interface FileOperations which has a method declaration for openFile now we have a fileSystem 
 * which is the main object and it implements the interface FileOperations.
 * It takes a fileName and open it in openFile method, however since we need role based authorization on this main
 * object therefore we will be using proxy design pattern, and thus we have created a FileSystemProxy class which
 * also implements FileOperations, in this case it needs a fileName as well as user role to operate , it provides
 * definition to openFile method and checks if the user is authorized it he is not authorized, it will simply
 * return with unauthorized however if its authorized this means it needs to call openFile method of mainObject like
 * file system and thus we need a reference of fileSystem also in in this proxy class and using it we called
 * the main objects openFile method. 
 * 
 */

interface FileOperations {
    openFile(): void;
}

class FilesSystem implements FileOperations {
    fileName: string;

    constructor(fileName: string) {
        this.fileName = fileName;
    }

    openFile(): void {
        console.log(`opening file ${this.fileName}`);
    }
}

class FileSystemProxy implements FileOperations {
    private fileName: string;
    private role: string;
    private fileSystem: FilesSystem | null = null;

    constructor(fileName: string, role: string) {
        this.fileName = fileName;
        this.role = role;
    }

    openFile() {
        if (this.role !== "admin") {
            console.log(`The user is not authorized to open the file ${this.fileName}`);
        } else {
            if (!this.fileSystem) {
                this.fileSystem = new FilesSystem(this.fileName);
            }
            this.fileSystem.openFile();
        }
    }
}

let fileSystem: FileOperations = new FileSystemProxy("systemDesign.pdf", "admin");
fileSystem.openFile();

fileSystem = new FileSystemProxy("systemDesign.pdf", "guest");
fileSystem.openFile();