import uniqid from "uniqid";
export default class List {
  constructor() {
    this.items = [];
  }
  deleteItem(id) {
    //id gedeg ID tee ortsiin index iig massive aas haij olno
    const index = this.items.findIndex(el => el.id === id);
    //Ug index deerh elment iig massive aas ustgan
    this.items.splice(index, 1);
  }
  addItem(item) {
    let newItem = {
      id: uniqid(),
      item: item
    };
    this.items.push(newItem);
    return newItem;
  }
}
