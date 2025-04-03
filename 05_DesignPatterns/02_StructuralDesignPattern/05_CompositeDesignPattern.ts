/**
 * 
 * Composite design pattern is used where there is some kind of hierarchy for ex say a tree structure which we needs 
 * to represent amongst classes.
 * 
 * So a tree structure looks like 
 * 
 *                               root
 *                      |                    |
 *                    child                 child
 *            |                 |        |
 *           child            leaf       leaf
 *      |           |
 *     leaf         leaf
 * 
 * Now the root in composite design pattern is known as component and the child is known as composite. Leaf remains as leaf.
 * 
 * Lets understand composite design pattern better with help of a situation, suppose we need to design a
 * folder structure where there will be a main root folder, then multiple folders can be a part of it.
 * 
 * A folder can contain a file or can contain multiple folders again inside it.
 * A folder in this case is composite whereas a file is a leaf.
 * 
 * If we need to design such situation we can use composite design pattern.
 * 
 * Lets understand this with help of code.
 * 
 * So we wish to create a file/Folder system . A folder/file system can have multiple folders or multiple files or 
 * even single folder or single file etc nested within itself.
 * 
 * So we create a FileComponentSystem interface which is created to create reference of a file or a folder as individual
 * file and folder classes will be implementing it.
 * 
 * Now we have a file class which implements FileComponentSystem and thus can act as a reference of FileComponentSystem.
 * Now a file can have a name and thus this name is passed as parameter to constructor by user and is set to instance variable
 * of the file class. The file class also provides implementation of showDetails method which show the fileName.
 * 
 * Now we can also have a Folder class, a folder can have a name and it can have multiple files or even multiple folders within it
 * and thus it will have a array of FileComponentSystem, It implements the FileComponentSystem interface and thus can act as a reference
 * for it.
 * 
 * Now it provides declaration to showDetails method which iterate over the array of FileComponentSystem, every element of 
 * FileComponentSystem is either a File reference or a Folder reference and thus we can call showDetails method over it.
 * 
 * Now we can add FileComponentSystem reference to Folder class using addComponent which pushes FileComponentSystem reference to the
 * array, we can even remove a FileComponentSystem reference from the array using removeComponent using 
 * this.components = this.components.filter((val) => val !== component);
 * 
 * So now we can test it saying we have 7 files of myImages like 1.png etc which are added to a folder named "images" using
 * 
 * let f1 = new Files("1.png");
   let f2 = new Files("2.png");
   let f3 = new Files("3.png");
   let f4 = new Files("4.png");
   let f5 = new Files("5.png");
   let f6 = new Files("6.png");
   let f7 = new Files("7.png");

   let folder1 = new Folder("MyImages");
   folder1.addComponent(f1);
   folder1.addComponent(f2);
   folder1.addComponent(f3);
   folder1.addComponent(f4);
   folder1.addComponent(f5);
   folder1.addComponent(f6);
   folder1.addComponent(f7);
 * 
 * Similarly we have say 4 eduction pdf's like Math.pdf etc and we add it to folder Education
 * 
 * let eduf1 = new Files("Maths.pdf");
   let eduf2 = new Files("Cs.pdf");
   let eduf3 = new Files("Ece.pdf");
   let eduf4 = new Files("Civil.pdf");
   
   let folder2 = new Folder("Eduction");
   folder2.addComponent(eduf1);
   folder2.addComponent(eduf2);
   folder2.addComponent(eduf3);
   folder2.addComponent(eduf4);
 * 
   Now we can add both these folders in a main root folder using


 * let root = new Folder("root");
   root.addComponent(folder1);
   root.addComponent(folder2);

   Similarly we can perform other operations also
 * 
   Thus we have designed a folder system using Composite design pattern, lets understand how it is following a 
   composite design patter,

   FileComponentSystem acts as main root of tree and a common interface or entry point in tree and can also be 
   understood as component.

   File class acts as a leaf as no new hierarchy develops from it and this its a leaf and it implements FileComponentSystem.
   
   Folder class acts as composite as it contains array of FileComponentSystem which can be both file or folder and thus resembles
   hierarchy and also implements FileComponentSystem.
 * 
 */

interface FileComponentSystem {
    showDetails(): void;
}

class Files implements FileComponentSystem {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    showDetails(): void {
        console.log(`File details are : ${this.name}`)
    }
}

class Folder implements FileComponentSystem {
    name: string;
    components: FileComponentSystem[];

    constructor(name: string) {
        this.name = name;
        this.components = [];
    }

    showDetails(): void {
        console.log(`Folder: ${this.name} \n`);
        for (let detail of this.components) {
            detail.showDetails();
        }
    }

    addComponent(component: FileComponentSystem) {
        this.components.push(component);
    }

    removeComponent(component: FileComponentSystem) {
        this.components = this.components.filter((val) => val !== component);
    }
}

let f1 = new Files("1.png");
let f2 = new Files("2.png");
let f3 = new Files("3.png");
let f4 = new Files("4.png");
let f5 = new Files("5.png");
let f6 = new Files("6.png");
let f7 = new Files("7.png");

let folder1 = new Folder("MyImages");
folder1.addComponent(f1);
folder1.addComponent(f2);
folder1.addComponent(f3);
folder1.addComponent(f4);
folder1.addComponent(f5);
folder1.addComponent(f6);
folder1.addComponent(f7);

let eduf1 = new Files("Maths.pdf");
let eduf2 = new Files("Cs.pdf");
let eduf3 = new Files("Ece.pdf");
let eduf4 = new Files("Civil.pdf");

let folder2 = new Folder("Eduction");
folder2.addComponent(eduf1);
folder2.addComponent(eduf2);
folder2.addComponent(eduf3);
folder2.addComponent(eduf4);

let root = new Folder("root");
root.addComponent(folder1);
root.addComponent(folder2);

console.log("Before removing folder")
root.showDetails();

root.removeComponent(folder2);

console.log("After removing folder")
root.showDetails();