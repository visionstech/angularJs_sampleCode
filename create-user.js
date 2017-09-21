// JavaScript Document
(function(){
	app.controller('createUserCtrl', function($scope, $api, $state, $stateParams, $mdDialog, $timeout, $mdToast, $localStorage)
    {
        $scope.$storage = $localStorage;
        $scope.close    = function(){$mdDialog.hide();}
        $api.load('-userTypes');

        //Update service provider
        $scope.createUser = function(form)
        {
            angular.forEach(form.$error, function (field) {
                angular.forEach(field, function(errorField){
                    errorField.$setTouched();
                })
            });
            if(form.$invalid) return;
            
            $scope.$storage.page.loader = true;

            $api.save('users', $scope.user)
            .success(function(res){
                $mdDialog.hide();
                $mdToast.show($mdToast.success({locals : {content:'New user successfully enrolled.'}}));
                $state.go('app.user.details', {id:res.data.id});
            })
            .error(function(res){
                var errors = '';
                angular.forEach(res.data.errors, function(item){
                    angular.forEach(item, function(err){errors += err+"\n";})
                })
                $mdDialog.show(
                    $mdDialog.immsAlert({locals : {data:{title:res.data.message, content:errors}}})
                );
            })
        }

    })
})();