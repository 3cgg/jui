/**
 * Created by J on 2017/11/10.
 */

/**
 * {
 *  layoutId : ..
 *  htmlUrl : ...
 *  htmlText : ...
 *  htmlDom : ...
 * }
 * @param v
 * @returns {{isSnapshot: $_youapp.$_snapshpt.isSnapshot}|*}
 */
(function snapshot(){

    function Snapshot() {
        var snapshots=$_youapp.$_util.newMap();

        function exists(key) {
            return snapshots.exists(key);
        }

        function getSnapshot(key) {
            return snapshots.get(key);
        }

        function putSnapshot(key,htmlDom) {
            return snapshots.put(key,htmlDom);
        }

        function keySnapshot(layoutId,htmlUrl) {
            return layoutId+"/"+htmlUrl;
        }

        return {

            isSnapshotOnHtml : function(html){
                return $(html).find('snapshot').length>0;
            },

            isSnapshot : function(layoutId,htmlUrl){
                return this.existsSnapshot(layoutId,htmlUrl);
            },

            existsSnapshot : function(layoutId,htmlUrl){
                var key=keySnapshot(layoutId,htmlUrl);
                return exists(key);
            },

            getSnapshot : function(layoutId,htmlUrl){
                var key=keySnapshot(layoutId,htmlUrl);
                return getSnapshot(key);
            },

            putSnapshot : function(layoutId,htmlUrl,htmlDom){
                var key=keySnapshot(layoutId,htmlUrl);
                return putSnapshot(key,htmlDom);
            }

        };

    }



    return $_youapp.$_snapshot=new Snapshot();

})();