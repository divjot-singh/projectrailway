var mod=angular.module('railservice',['ngResource']);
mod.factory('Train',function($http){
	var trains={};
	trains.getTrains=function()
	{
		$http.get('trains.json').success(function(data,status){
			trains.train=data;
		});
		return trains.train;
	}
	return trains;
});
mod.factory('Reservation',function(){
	var reservations=[{
		id:null,
		name:null,
		source:null,
		code:null,
		destination:null,
		PNR:null,
		quantity:null,
		price:null
	}];
	var size=0;
	reservations.add=function(names,sources,destinations,codes,pnrs,price)
	{
		var flag=0;
			for(i in reservations)
			{
				if(codes==reservations[i].code)
				{
					reservations[i].quantity+=1;
					reservations[i].price=parseInt(price)+parseInt(reservations[i].price);
					flag+=1;
				}
			}
		if(flag==0)
		{
			var reservation={};
			reservation.id=size++;
			reservation.name=names;
			reservation.source=sources;
			reservation.destination=destinations;
			reservation.code=codes;
			reservation.PNR=pnrs;
			reservation.price=price;
			reservation.quantity=1;
			reservations.push(reservation);
		}

	}
	reservations.view=function()
	{
		//console.log(reservations);
		return reservations;
	}
	return reservations;
});