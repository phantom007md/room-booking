/// <reference path="./util.ts"/>
namespace Booking {
  export class RoomManage {
    constructor() {
      this.bindDeligateEvents();
      this.templateInjector();
    }
    //----------------------BindEvents-----------------------------
    private bindDeligateEvents(){
      Booking.$.on('body','change','.room-select', (e) => {
        this.roomIndexManager();
      });
      Booking.$.on('body','change','.child-count', (e) => {
        this.childIndexManager(e);
      });
      Booking.$.on('body','change','.infant-count', (e) => {
        this.infantIndexManager(e);
      });
    }
    //---------------------RoomIndexing----------------------------
    private roomRowArr(){
      const roomArr = Booking.$.selectall('.row-index');
      return roomArr;
    }
    private roomCountVal(){
      const roomSelectValue = Booking.$.selectBoxVal('.room-select');
      return parseInt(roomSelectValue);
    }
    private roomIndexCounter(){
      let roomIndexArr = Booking.$.selectall('.row-id');
      return  roomIndexArr.length
    }
    private rowIndexNumGenerate(){
      const rowIds = this.roomIndexCounter();
      return rowIds + 1;
    }
    private roomIndexManager(){
      const roomCount = this.roomCountVal();
      const roomIndex = this. roomIndexCounter();
      if (roomCount == roomIndex) {
        return
      }else if(roomCount > roomIndex){
        const nRoom = roomCount - roomIndex
        for (let i = 0; i < nRoom; i++) {
            this.templateInjector();
        }
      }else if(roomCount < roomIndex) {
        this.removeRoomIndex();
      }
    }
    private removeRoomIndex(){
      const rowIdsNum = this.roomIndexCounter();
      const roomCount = this.roomCountVal();
      const needToDelete =  rowIdsNum - roomCount;
      const roomArr = this.roomRowArr();
      for (let i = 0; i < needToDelete; i++) {
          console.log('needToDelete')
          roomArr[i+roomCount].remove();
      }
    }
    //--------------------ChildIndexing----------------------------
    private childCountVal(e){
      const childSelectVal = Booking.$.selectBoxVal(e.target);
      return parseInt(childSelectVal);
    }
    private childIndexCounter(e){
      const parent = e.target.parentNode.parentNode;
      const childIndexArr = Booking.$.selectall('.child-age-wrap', parent);
      return childIndexArr.length
    }
    private childArr(e){
      const parent = e.target.parentNode.parentNode;
      const Arr = Booking.$.selectall('.child-age-wrap',parent);
      return Arr;
    }
    private childIndexManager(e){
      const childCount = this.childCountVal(e);
      const childIndex = this.childIndexCounter(e);
      if (childCount == childIndex) {
        return
      }else if(childCount > childIndex){
        const nRoom = childCount - childIndex
        for (let i = 0; i < nRoom; i++) {
            this.childTemplateInjector(e);
        }
      }else if(childCount < childIndex) {
        this.removeChildIndex(e);
      }
    }
    private removeChildIndex(e){
      const childCount = this.childCountVal(e);
      const childIdsNum = this.childIndexCounter(e)
      const needToDelete =  childIdsNum - childCount;
      const childArr = this.childArr(e)
      for (let i = 0; i < needToDelete; i++) {
          childArr[i+childCount].remove();
      }
    }
    //--------------------InfantIndexing----------------------------
    private infantCountVal(e){
      const infantSelectVal = Booking.$.selectBoxVal(e.target);
      return parseInt(infantSelectVal);
    }
    private infantIndexCounter(e){
      const parent = e.target.parentNode.parentNode;
      const infantIndexArr = Booking.$.selectall('.infant-age-wrap', parent);
      return infantIndexArr.length
    }
    private infantArr(e){
      const parent = e.target.parentNode.parentNode;
      const Arr = Booking.$.selectall('.infant-age-wrap',parent);
      return Arr;
    }
    private infantIndexManager(e){
      const infantCount = this.infantCountVal(e);
      const infantIndex = this.infantIndexCounter(e);
      if (infantCount == infantIndex) {
        return
      }else if(infantCount > infantIndex){
        const nRoom = infantCount - infantIndex
        for (let i = 0; i < nRoom; i++) {
            this.infantTemplateInjector(e);
        }
      }else if(infantCount < infantIndex) {
        this.removeinfantIndex(e);
      }
    }
    private removeinfantIndex(e){
      const infantCount = this.infantCountVal(e);
      const infantIdsNum = this.infantIndexCounter(e)
      const needToDelete =  infantIdsNum - infantCount;
      const infantArr = this.infantArr(e)
      for (let i = 0; i < needToDelete; i++) {
          infantArr[i+infantCount].remove();
      }
    }
    //--------------------TemplateInjector-------------------------
    private templateInjector(){
      const roomTemplate = this.templateGenrator();
      Booking.$.select('.row-index-wrap').appendChild(roomTemplate);
    }
    private childTemplateInjector(e){
      const childTemplate = this.childTemplateGenerator();
      const parent = e.target.parentNode.parentNode;
      Booking.$.select('.child-select', parent).appendChild(childTemplate);
    }
    private infantTemplateInjector(e){
      const infantTemplate = this.infantTemplateGenerator();
      const parent = e.target.parentNode.parentNode;
      Booking.$.select('.infant-select', parent).appendChild(infantTemplate);
    }
    //-----------------------TemplateGenerator---------------------
    private templateGenrator() {
      let appendHandler = document.createElement('div');
      appendHandler.classList.add('row-index')
      let roomTemplateString = `
          <span class="row-id">${this.rowIndexNumGenerate()}</span>
          <div class="row">
            <div class="count-select"><span>adult count:</span>
              <select class="adult-count">
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select><span>child count:</span>
              <select class="child-count">
                <option>0</option>
                <option>1</option>
                <option>2</option>
              </select><span>infant count:</span>
              <select class="infant-count">
                <option>0</option>
                <option>1</option>
                <option>2</option>
              </select>
            </div>
            <div class="age-select">
              <div class="child-select">

              </div>
              <div class="infant-select">

              </div>
            </div>
          </div>`;
      appendHandler.innerHTML = roomTemplateString;
      return appendHandler;
    }
    private childTemplateGenerator(){
      let appendhandler = document.createElement('div');
      appendhandler.classList.add('child-age-wrap');
      appendhandler.innerHTML =`
      <span>child </span>
      <span>1</span>
      <span>age</span>
      <select class="child-age">
        <option>2 YEAR</option>
        <option>3 YEAR</option>
        <option>4 YEAR</option>
        <option>5 YEAR</option>
        <option>6 YEAR</option>
        <option>7 YEAR</option>
      </select>`;
      return appendhandler;
    }
    private infantTemplateGenerator(){
      let appendHandler = document.createElement('div');
      appendHandler.classList.add('infant-age-wrap');
      appendHandler.innerHTML = `
      <span>infant </span><span>1</span><span>age</span>
        <select class="infant-age">
          <option>0 YEAR </option>
          <option>1 YEAR</option>
          <option>2 YEAR</option>
        </select>`;
      return appendHandler;
    }
  }
}
