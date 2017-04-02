/**
 * Model Tasks
 */
function getTasks(){
  this.items = [];
  /**
    {name:'task name 1',finished:false},
    {name:'task name 2',finished:false},
    {name:'task name 3',finished:false}
  */
  var list = localStorage.getItem('taskList');

  if (list !== null) {
    this.items = angular.fromJson(list);
  }

  /**
   * Save an item on List.
   * @param item
   */
  this.save = function(item){
    var list = angular.toJson(this.items);
    localStorage.setItem('taskList',list);
  };

  /**
   * Add a new item to List.
   * @param item
   */
  this.add = function(item){
    this.items.push(item);
  };

  /**
   * Remove an item from List.
   * @param item
   */
  this.remove = function(item){
    /**
     * @Link http://www.w3schools.com/jsref/jsref_indexof_array.asp
     * Definition and Usage
     * The indexOf() method searches the array for the specified item, and returns its position.
     * The search will start at the specified position, or at the beginning if no start position is specified, and end the search at the end of the array.
     * Returns -1 if the item is not found.
     * If the item is present more than once, the indexOf method returns the position of the first occurence.
     * Note: The first item has position 0, the second item has position 1, and so on.
     * Tip: If you want to search from end to start, use the lastIndexOf() method
     */

    var itemPositionInList = this.items.indexOf(item);
    /**
     * @Link http://www.w3schools.com/jsref/jsref_splice.asp
     * Definition and Usage
     * The splice() method adds/removes items to/from an array, and returns the removed item(s).
     * Note: This method changes the original array.
     */
    this.items.splice(itemPositionInList, 1);
  };

}
