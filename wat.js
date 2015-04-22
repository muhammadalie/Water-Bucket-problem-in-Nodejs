queue = [];
seen  = {};

function getState(){
        
        if (!queue){ return null;}
	else{
        state = queue[0];
        queue = queue.slice(1);
        return state;}
 }
function addState( parentState, newState){
        if(seen[String(newState)]!=undefined){ return ;}
        seen[String(newState)] = String(parentState);
        queue.push(newState);
}

function getSolution(){
        var solution = [];
        state = queue[queue.length-1];
        while(state){
            solution.push(String(state));
            state = getParent(state);
	}
        solution.reverse();
        return solution;
}
function getParent(childState){
 
        try{ return seen[String(childState)];}	
        catch(err){return null;}
}

function test (oldstate, newstate,goal) {
        var newA = newstate[0];
	var newB = newstate[1];
        var won = (newA == goal || newB == goal)
        addState (oldstate, newstate);
        return won;
}

function playGame (aMax, bMax, goal){
        addState("", [0,0]);
        while(1){
            oldstate = getState()
            aHas = oldstate[0];
	    bHas=oldstate[1];
            if(test(oldstate, [aMax,bHas],goal)){ break; }
            if(test(oldstate, [0   ,bHas],goal)){ break; }
            if(test(oldstate, [aHas,bMax],goal)){ break ;}
            if(test(oldstate, [aHas,0   ],goal)){ break ;}
            howmuch = Math.min(aHas, bMax-bHas);
            if(test(oldstate, [aHas-howmuch,bHas+howmuch],goal)){ break;}
            howmuch = Math.min(bHas, aMax-aHas);
            if(test(oldstate, [aHas+howmuch,bHas-howmuch],goal)){ break;}
	}
        console.log("Solution is ");
	
	console.log (getSolution().join("\n"));
}

playGame(7,11,6)
