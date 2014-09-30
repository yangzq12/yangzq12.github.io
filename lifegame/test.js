
test("Initial",function(){
	 var TEST=new lifegame();
         

           equal(TEST.Initial(), true, "passed!");
        });

test("Random", function(){
	 var TEST = new lifegame();
	  equal(TEST.Random(),false,"have not Initial!");
	  TEST.Initial();
	  equal(TEST.Random(),true,"passed!");

	}); 
 
test("Reverse",function(){
	 var TEST = new lifegame();
	  equal(TEST.Reverse(1,1),false,"have not Initial!");
	  TEST.Initial();
	  equal(TEST.Reverse(40,40),false,"Out of the boundary!");
	  equal(TEST.Reverse(39,0),true,"passed!");
	}); 

test("AllDead and AllLive",function(){
	 var TEST = new lifegame();
	 TEST.Initial();
	equal(TEST.AllDead(),true,"passed!");
	equal(TEST.AllLive(),true,"passed!");
	});
	
test("FirstStep",function(){
	var TEST = new lifegame();

	TEST.Initial(3,3);
	TEST.cells=[[0,1,0],[0,1,0],[0,1,0]];
	TEST.FirstStep();
	
	deepEqual(TEST.cells,[[1,1,1],[1,1,1],[1,1,1]],"passed!");
	
	TEST.cells=[[1,0,1],[0,0,0],[1,0,1]];
	TEST.FirstStep();
	deepEqual(TEST.cells,[[1,0,1],[0,0,0],[1,0,1]],"passed!");
	
	TEST.Initial(1,1);
	TEST.cells=[[0]];
	TEST.FirstStep();
	deepEqual(TEST.cells,[[0]],"1*1,passed!");
	
	});
	
test("Steps",function(){
	var TEST = new lifegame();
	TEST.Initial(3,3);
	TEST.cells=[[1,0,1],[0,0,0],[1,0,1]];
	TEST.FirstStep();
	TEST.Steps();
	deepEqual(TEST.cells,[[1,0,1],[0,0,0],[1,0,1]],"3*3,passed!");
	
	TEST.Initial(3,4);
	TEST.cells=[[1,0,0,1],[0,0,0,0],[1,0,0,1]];
	TEST.FirstStep();
	TEST.Steps();
	deepEqual(TEST.cells,[[1,0,0,1],[0,0,0,0],[1,0,0,1]],"3*4,passed!");
	
	TEST.Initial(1,1);
	TEST.cells=[[0]];
	TEST.FirstStep();
	TEST.Steps();
	deepEqual(TEST.cells,[[0]],"1*1,passed!");
	});