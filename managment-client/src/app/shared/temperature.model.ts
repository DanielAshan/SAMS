export class Temperature {
    public id: String;
    public name: String;
    public date: Date;
    public value: Number;

    constructor (id: String, name: String, date: Date, value: number) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.value = value;
    }
}
