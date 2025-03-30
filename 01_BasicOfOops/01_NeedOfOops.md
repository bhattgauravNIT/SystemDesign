<!--

Procedural programming (a step by step approach to solve a problem like breaking the code into
procedures or functions which perform operation on data), is executed line by line and has some drawbacks 
like scalability issues and security issues as global variables can be accessed and modified by multiple 
methods thus the concept of Oops comes into picture i,e Object oriented programming.

Take example of a candle vessel, say i m making a candle from a rectangular vessel
This vessel determines the shape of the candle, if this vessel is circular than the product i,e candle
which comes out will be of shape circle and thus

we can say that candle the product is a object whereas the vessel which determines the shape
of the product is the class.

So class is nothing but a blueprint that defines the properties and behavior which the object follows, it can also
be considered as the definition of object.

whereas the candle is the object and thus object is nothing but an instance of class which follows the blue print of the class.

Now this candle can have two states i,t light up or not light up.
Similarity this candle can have two behaviors it can be lit up or it can be lit down say using a matchbox etc.

So the states are nothing but the instance members/variables of the class whereas the behavior is nothing
but the class methods/functions, these both are also associated with each object which follows the blueprint of 
this class 

Class Candle{

isOn: boolean;   // state or instance variable.

constructor(){}

switchCandleState(){       // behavior or class method
   this.isOn = !this.isOn;   
}

}

>