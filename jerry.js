class RangeList {
 /**
 * A range must be an arrary of length of 2. 
 * Element in range must be number
 * The second integer must be no less than first one.
 */
  constructor(){
    this.rangelist=[];
  }
 
/**
 * Adds a range to the list
 * @param {Array<number>} range - Array of two integers that specify
beginning and end of range.
 */
  add(range) {
    try {
      if(!Array.isArray(range)) throw "must be an arrary in length of 2!";
      if(range.length != 2) throw "array length should be exactly 2!";
      if(!(Number.isInteger(range[0])&&Number.isInteger(range[1]))) throw "can only conatin integers!";
      if(range[0]>range[1]) throw "cannot have a second integer smaller than the first one!";
    } 
    catch(err) {
      console.log(`Input range ${err}`);
      return;
    }
    //range with zero gap is an empty one
    if (range[0]==range[1]) {return;}
    //first range in rangelist
    if (this.rangelist.length==0){this.rangelist.push(range); return;}
  
    var start=0; var end=this.rangelist.length-1;
    //if the new range doesn't have intersection with current rangelist, insert it at front or rear
    if (range[0]>this.rangelist[end][1]) {
      this.rangelist.push(range);
      return;
    }
    if (range[1]<this.rangelist[start][0]) {
      this.rangelist.unshift(range);
      return;
    }
    //find the point for inserting range[0] and range[1]
    var cur=this.find_insert_point(start,end,range[0]);
    var rear=this.find_insert_point(start,end,range[1]);
    //merge current range with new range
    range[0]=Math.min(this.rangelist[cur][0],range[0]);
    range[1]=Math.max(this.rangelist[cur][1],range[1]);
    // insert the new range in and delete all ranges included in this new range
    this.rangelist.splice(cur,rear-cur,range);
    //if new range has intersection with next one, merge it with new range
    if ((cur<this.rangelist.length-1)&&(this.rangelist[cur][1]>=this.rangelist[cur+1][0])) {
      this.rangelist[cur][1]=this.rangelist[cur+1][1];
      this.rangelist.splice(cur+1,1);
    }
  }

 /**
 * Removes a range from the list
 * @param {Array<number>} range - Array of two integers that specify
beginning and end of range.
 */
  remove(range) {
    try {
      if(!Array.isArray(range)) throw "must be an arrary in length of 2!";
      if(range.length != 2) throw "array length should be exactly 2!";
      if(!(Number.isInteger(range[0])&&Number.isInteger(range[1]))) throw "can only conatin integers!";
      if(range[0]>range[1]) throw "cannot have a second integer smaller than the first one!";
    } 
    catch(err) {
      console.log(`Input range ${err}`);
      return;
    }
    /**
     * Remove range with zero gap or emptyu Rangelist or range needs to be removed is 
       outsite of current rangelist
     * Do nothing and return  
    */
    var start=0; var end=this.rangelist.length-1;
    if ((range[0]==range[1])||(this.rangelist.length==0)||(range[0]>=this.rangelist[end][1])||(range[1]<=this.rangelist[start][0])) {return;}
    //  find the point for deleting range[0] and range[1]
    var cur=this.find_insert_point(start,end,range[0]);
    var rear=this.find_insert_point(start,end,range[1]);
    //  if the range at start point has part that will be left, we insert it first
    if (range[0]>this.rangelist[cur][0]) {
      this.rangelist.splice(cur,0,[this.rangelist[cur][0],Math.min(this.rangelist[cur][1],range[0])]);
      cur++;
      rear++;
    }
    //  If the rear point is outside of rangelist, delete rest of ranges in rangelist and return;
    if (rear==this.rangelist.length) {
      this.rangelist.splice(cur,rear-cur);
      return;
    }
    //  Save the range at rear point
    let tmp=[this.rangelist[rear][0],this.rangelist[rear][1]];
    //  Rmove all ranges between start and rear point
    this.rangelist.splice(cur,rear-cur+1);
    //  If there's left range at rear point, insert it
    if (range[1]<tmp[1]) {
      this.rangelist.splice(cur,0,[Math.max(tmp[0],range[1]),tmp[1]]);
    }
  }
  /**
   * Prints out the list of ranges in the range list in console
   */
  print() {
    if (this.rangelist.length==0) {
      console.log('Empty RangeList');
      return;
  }
  console.log('['+this.rangelist.join(') [')+')');
  //  this.rangelist.forEach(element => document.writeln(`[${element})<br>`));
  }

 /**
 * Use binary search to find the point to insert new value
 * it will return the index of the first range that has range[1]>val
 * @param {Number} start - The start index of this.rangelist
 * @param {Number} end - The end index of this.rangelist
 * @param {Number} val - The value need to be located
 * @return {number} the index of the first range in this.rangelist that has val<=range[1]
 */
  find_insert_point(start, end, val) {
    while (start<=end) {
      let mid=Math.floor((start+end)/2);
      if (val<=this.rangelist[mid][1]){
        end=mid-1;
      }else{
        start=mid+1;
      }
    }
    return start;
  }
}
// Example run
const rl = new RangeList();
 /**
 * Test the RangeList Class utility
 * @param {Number} testopt - What kinds of tests to run.
 * 1 for adding new range to RangeList Class
 * 2 for adding and removing ranges in RnageList Class
 */
function test_rangelist(testopt) {
  if (testopt>=1){
    rl.print();
    rl.add([1,5]);
    rl.print();
    // Should display: [1, 5)
    rl.add([10, 20]);
    rl.print();
    // // Should display: [1, 5) [10, 20)
    rl.add([20, 20]);
    rl.print();
    // Should display: [1, 5) [10, 20)
    rl.add([20, 21]);
    rl.print();
    // Should display: [1, 5) [10, 21)
    rl.add([2, 4]);
    rl.print();
    // Should display: [1, 5) [10, 21)
    rl.add([3, 8]);
    rl.print();
    // Should display: [1, 8) [10, 21)
    rl.add([22, 25]);
    rl.print();
    // Should display: [1,8) [10,21) [22,25)
    rl.add([-10, 0]);
    rl.print();
    // Should display: [-10,0) [1,8) [10,21) [22,25)
    rl.add([8, 9]);
    rl.print();
    // Should display: [-10,0) [1,9) [10,21) [22,25)
    rl.add([9, 10]);
    rl.print();
    // Should display: [-10,0) [1,21) [22,25)
    rl.add([-1, 23]);
    rl.print();
    //Should display: [-10,25)
  }
  if (testopt>=2) {
    rl.remove([10, 10]);
    rl.print();
    // Should display: [-10,25)
    rl.remove([10, 11]);
    rl.print();
    // Should display: [-10,10) [11,25)
    rl.remove([15, 17]);
    rl.print();
    // Should display: [-10,10) [11,15) [17,25)
    rl.remove([3, 19]);
    rl.print();
    // Should display: [-10,3) [19,25)
    rl.remove([3, 21]);
    rl.print();
    // Should display: [-10,3) [21,25)
    rl.remove([-11, -8]);
    rl.print();
    // Should display: [-8,3) [21,25)
    rl.remove([-8, 22]);
    rl.print();
    // Should display: [22,25)
    rl.remove([-8, 200]);
    rl.print();
    // Should display: None
  }

}
test_rangelist(2);
