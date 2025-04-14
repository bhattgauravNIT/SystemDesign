export function generateId(value: number): string {
    const generator = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < value; i++) {
        let index = Math.floor(Math.random() * generator.length);
        id += generator[index];
    }
    return id;
}