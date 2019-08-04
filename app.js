var app=angular.module('myApp',['ngRoute']);
app.config(function($routeProvider){
    $routeProvider
    .when('/employee',{
          controller: 'employeeController',
          templateUrl: 'employee.html'
          })
    .when('/create',{
          controller: 'createController',
          templateUrl: 'create.html'
          })
        .when('/update',{
          controller: 'updateController',
          templateUrl: 'update.html'
          })
        .when('/delete',{
          controller: 'deleteController',
          templateUrl: 'delete.html'
          })
    
});

var empname=[  
        {id:1,name:"john",employeeID:"32",designation:"ret"},
        {id:2,name:"john1",employeeID:"32",designation:"ret"},
        {id:3,name:"john2",employeeID:"32",designation:"ret"},
        {id:4,name:"john3",employeeID:"32",designation:"ret"}
    ];

app.controller('employeeController',function($scope){
    $scope.empname=empname;
});

app.controller('createController',function($scope){
    $scope.empname=empname;
    var maxID=(Math.max.apply(null,$scope.empname.map(x =>x.id))||0)+1;
    
   $scope.add= function(){
//       if(($scope.name !='') && ($scope.emid!='') && ($scope.de!=''))
//           {
               $scope.empname.push({id:maxID,name:$scope.name,employeeID:$scope.emid,designation:$scope.de});
               
               $scope.name ='';
               $scope.emid ='';
               $scope.de = '';
//           
       console.log($scope.empname);
   
}


});


app.controller('deleteController',function($scope){
   $scope.empname=empname;
    $scope.remove=function(item){
        var index=$scope.empname.indexOf(item)
        $scope.empname.splice(index,1);
    }
});

app.controller('updateController',['$scope','$filter',function($scope,$filter){
    $scope.empname=empname;
//    $scope.errorMessage= false;
    $scope.checkAll=function(){
        $scope.selectedAll=false;
        if(!$scope.selectedAll){
            $scope.selectedAll=true;
        }else{
            $scope.selectedAll=false;
        }
        angular.forEach($scope.empname,function(x){
            x.selected= $scope.selectedAll;
        });
    }
    $scope.singleEmployeeSelected = false;
    $scope.setSelectedEmployee= function(x){
        if($scope.empname.filter(x => x.selected).length > 1){
            $scope.selectedEmployee = null;
            $scope.singleEmployeeSelected= false;
        }
        else{
            $scope.selectedEmployee = angular.copy($scope.empname.find(x => x.selected));
            $scope.singleEmployeeSelected =!!$scope.selectedEmployee;
        }
    }
   
    $scope.edit = function(){
//        if(!!$scope.empname.find(x => x.name === $scope.selectedEmployee.name  && x.emid === $scope.selectedEmployee.emid))
//            {
//                $scope.errorMessage= true;
//                return;
//            }
        var employeeToEdit = $scope.empname.find(x => x.id === $scope.selectedEmployee.id);
        employeeToEdit.name=$scope.selectedEmployee.name;
        employeeToEdit.employeeID=$scope.selectedEmployee.employeeID;
        employeeToEdit.designation=$scope.selectedEmployee.designation;
        
        
         $scope.name ='';
               $scope.employeeID ='';
               $scope.designation = '';
    }
}]);












