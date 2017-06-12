var app = angular.module('materializeApp', ['ui.materialize']).controller('UploadController', ["$scope",'$http', function ($scope, $http) {
    
    $scope.predicted = "";

    $scope.setFiles = function(element) {
            $scope.$apply(function(scope) {
                console.log('files:', element.files);
                // Turn the FileList object into an Array
                $scope.file = element.files[0]
                $scope.progressVisible = false
          });
        };

    $scope.uploadFile = function() {
        var fd = new FormData()
        fd.append("file", $scope.file)
        $http.post("https://glacial-reaches-30152.herokuapp.com/predict", fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(data){
            var biggest = 0;
            var pcloud = "";
            for (var cloud in data){
                var prob = data[cloud];
                if(prob > biggest){
                    biggest = prob;
                    pcloud = cloud;
                }
            }
            $scope.predicted = pcloud + " " + Math.round(biggest*100) + "%";
            console.log("success: "+$scope.predicted);
        })
        .error(function(){
            console.log("failed");
        });
    }

    function uploadProgress(evt) {
        $scope.$apply(function(){
            if (evt.lengthComputable) {
                $scope.progress = Math.round(evt.loaded * 100 / evt.total)
            } else {
                $scope.progress = 'unable to compute'
            }
        })
    }

    function uploadComplete(evt) {
        /* This event is raised when the server send back a response */
        alert(evt.target.responseText)
    }

    function uploadFailed(evt) {
        alert("There was an error attempting to upload the file.")
    }

    function uploadCanceled(evt) {
        $scope.$apply(function(){
            $scope.progressVisible = false
        })
        alert("The upload has been canceled by the user or the browser dropped the connection.")
    }
}]);
