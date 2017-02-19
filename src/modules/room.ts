/// <reference path="./util.ts"/>

namespace Booking {

  export class RoomManage {
    private roomTemplate: string;
    private roomCount: number;

    constructor() {
      this.roomRow();
    }

    private roomRow() {

      this.roomCount = Booking.$.selectBoxVal('.room-select');
      
      this.roomTemplate = `
        <div class="row-index"><span class="row-id">1</span>
          <div class="row">
            <div class="count-select"><span>adult count:</span>
              <select class="adult-count">
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
              <div class="child-age-wrap"><span>child </span><span>1</span><span>age</span>
                <select class="child-age">
                  <option>2 YEAR</option>
                  <option>3 YEAR</option>
                  <option>4 YEAR</option>
                  <option>5 YEAR</option>
                  <option>6 YEAR</option>
                  <option>7 YEAR</option>
                </select>
              </div>
              <div class="infant-age-wrap"><span>infant </span><span>1</span><span>age</span>
                <select class="infant-age">
                  <option>0 YEAR </option>
                  <option>1 YEAR</option>
                  <option>2 YEAR</option>
                </select>
              </div>
            </div>
          </div>
        </div>`
    }

  }

}
