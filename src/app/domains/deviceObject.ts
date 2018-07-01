export class DeviceObjects {
  private _id: number;
  private _name: string;

  get id() {
    return this._id;
  }
  set id(id: number) {
    this._id = id;
  }

  get name() {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }
}
