## page snapshot (reference model: content-list.html)
- put the tag ```<snapshot>``` in the top level ,
- when the snapshot page is re-rendered, the 'snapshot.shown' event is triggered,
  registering the event callback function is to clear or reset,  , i.e.
    ```
    page.root.find('snapshot').on('onCallback',function (event,args) {
        console.log(event);
        page.listTable.ajax.reload(null,false);  //  the second parameter is pageable , if true the page is saved , false the previous page is reset.
    })
    ```

## boot.js
including configuration below : 
- jquery validation extension
- datetime picker configuration
- how to use code table function to initialize the codes, get data from server or declare `fnData` function instead.
- add `trim text` function on all input component
- others ...
