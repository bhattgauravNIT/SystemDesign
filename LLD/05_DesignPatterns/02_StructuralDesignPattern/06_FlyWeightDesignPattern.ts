/**
 * 
 * Flyweight design pattern is used when we need to reduce memory usage and improve performance while dealing with large number
 * of mostly similar objects. It does so by sharing largely all common features of an object instead of creating duplicates again and
 * again.
 * 
 * Its generally used when we have n number of mostly similar objects where n is very large.
 * 
 * The properties / features which remains common amongst objects are know an intrinsic state, where as the properties which
 * differ are Extrinsic state.
 * 
 * Lets understand this with help of a situation.
 * 
 * I have a code editor and in the code editor multiple characters can be typed, however these different characters can have different font
 * styes like say different font family, different font size, different font color.
 * 
 * We need to implement such type of functionality, here there can be huge number of characters and it might be possible that many characters
 * can be using the same font style i,e font size, font family, color so if we use fly weight pattern to design this, it will help in memory
 * usage and we don't need to repeat multiple objects with mostly all same properties. 
 * 
 * These properties which can remain same in this case are font size, font family, color thus they will be our intrinsic state, whereas
 * the characters will differ thus they are Extrinsic state.
 * 
 * Lets understand this fly weight design pattern better with help of code.
 * 
 * The main idea here is that if in case we found same intrinsic properties being used again by some other character for which we have already
 * created an object for we don't create a new object rather pass the same reference of older object to this new character.
 * In case we are encountering these intrinsic properties for the first time then we create a new object and pass its reference to this character.
 * 
 * In order to achieve this we have a FontFactory which takes care of object creation.
 * Our fontFactory has a static map of string -> object of Font.
 * This map since is static remains same for all objects of FontFactory.
 * 
 * The key can be formulated via let key = `${fontFamily}_${fontSize}_${color}` i,e string concatenation of intrinsic properties.
 * Now in this map if this key does not exists this means we are encountering these intrinsic properties for the first time and thus we will
 * create a new object of Font and will place it against this key in map.
 * 
 * So in our use case doc.addCharacters("H", "Arial", 12, "Black");
 * we encounter key "Arial_12_Black" for first time and thus created a new object of Font using these properties and placed in map
 * so our map looks like 
 * 
 * Map: {
 * 
 * "Arial_12_Black": Font { fontFamily: 'Arial', fontSize: 12, color: 'Black' }
 * 
 * }
 * 
 * Now when we encounter doc.addCharacters("e", "Arial", 12, "Black");
 * 
 * so this key "Arial_12_Black" was already present in map and thus we don't create a new object of font rather pass the old
 * reference of the previous object only to this.
 * 
 * This happens inside getFonts function of FontFactory.
 * 
 * Now let come back to FontStyle interface this interface has three intrinsic states i,e fontFamily, fontSize and color and has a declaration 
 * of apply method.
 * 
 * We have a flyweight class called Font which implements this interface and is needed for object creation via help of intrinsic states only
 * i,e fontFamily, fontSize and color which are passed as arguments to its constructor.
 * 
 * This flyweight class implements applyMethod which apply these properties to the character.
 * 
 * Now lets see how our client can use it so we have a documents class, this documents class has a private characters array 
 * characters: { char: string, font: FontStyle | undefined }[] = [];
 * 
 * it is an array of object where each object has the character which we want to apply the font on and its corresponding mapping with
 * the Font class object. Since font class implements font style thus we can say that each object has the character which we want to apply
 * the font on and its corresponding mapping with the FontStyle reference.
 * 
 * This array gets formulated in addCharacters method of documents class, 
 * when we add a character with specific font it calls FontFactory'S getFont method, if the same fontStyle is already present in memory
 * it gives back the object of Font class, this object is mapped with the character and pushed to array, if it finds the font provided by
 * user for first time, the fontFactory creates the object and pass that reference to it and this new object gets mapped to this character
 * along with this new object reference.
 * 
 * The characters array looks like:
 * 
 * [
  {
    char: 'H',
    font: Font { fontFamily: 'Arial', fontSize: 12, color: 'Black' }
  },
  {
    char: 'e',
    font: Font { fontFamily: 'Arial', fontSize: 12, color: 'Black' }
  },
  {
    char: 'l',
    font: Font { fontFamily: 'Arial', fontSize: 12, color: 'Black' }
  },
  {
    char: 'l',
    font: Font { fontFamily: 'Arial', fontSize: 12, color: 'Black' }
  },
  {
    char: 'o',
    font: Font { fontFamily: 'Times New Roman', fontSize: 14, color: 'Blue' }
  },
  {
    char: '!',
    font: Font { fontFamily: 'Times New Roman', fontSize: 14, color: 'Blue' }
  }
 ]
 * 
 * for the given set of use cases. 
 * 
 * Now the render method inside the document class will simply iterate over the characters array and will call the apply method
 * of Font class which it has over ridden through interface FontFamily and will apply the font family, font size and color respectively to the
 * char.
 * 
 * Thus flyweight pattern helps memory optimization by only creating objects whose intrinsic state is being encountered for the first time.
 */

interface FontStyle {
    fontFamily: string;
    fontSize: number;
    color: string;
    apply(char: string): void;
}

class Font implements FontStyle {
    fontFamily: string;
    fontSize: number;
    color: string;

    constructor(fontFamily: string, fontSize: number, color: string) {
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.color = color;
    }

    apply(char: string): void {
        console.log(`Applying font to ${char} , Font Family: ${this.fontFamily}, Font Size: ${this.fontSize}, Color: ${this.color}`);
    }
}

class FontFactory {
    private static fontMap: Map<string, Font> = new Map<string, Font>();

    static getFonts(fontFamily: string, fontSize: number, color: string): Font | undefined {
        let key = `${fontFamily}_${fontSize}_${color}`;
        if (!this.fontMap.has(key)) {
            console.log(`Creating a new font: Font Family: ${fontFamily}, Font Size: ${fontSize}, Color: ${color}`)
            this.fontMap.set(key, new Font(fontFamily, fontSize, color));
        }
        return this.fontMap.get(key);
    }
}

class Documents {
    private characters: { char: string, font: FontStyle | undefined }[] = [];

    addCharacters(char: string, fontFamily: string, fontSize: number, color: string) {
        const font = FontFactory.getFonts(fontFamily, fontSize, color);
        let obj = { char, font };
        this.characters.push(obj);
    }

    render(): void {
        for (const { char, font } of this.characters) {
            font?.apply(char);
        }
    }
}

let doc = new Documents();
doc.addCharacters("H", "Arial", 12, "Black");
doc.addCharacters("e", "Arial", 12, "Black");
doc.addCharacters("l", "Arial", 12, "Black");
doc.addCharacters("l", "Arial", 12, "Black");
doc.addCharacters("o", "Times New Roman", 14, "Blue");
doc.addCharacters("!", "Times New Roman", 14, "Blue");

console.log("Rendering document");
doc.render();