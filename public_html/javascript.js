/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var imageURLArray = 
		new Array("1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg");
var imgHolder;
var nextPictureToShow;
var refreshedIntervalId;
var smallContainers;

$(document).ready(function()
{
	var container = $('#smallPicsContainer');
	smallContainers = container.find('div.SmallPic');
	imgHolder = document.getElementById('currentPicture');
	nextPictureToShow = 0;
	
	$(smallContainers).each(function(index)
	{
		$(this).mouseover(function()
		{
			$(this).addClass('HoveredPic');
		});
		
		$(this).mouseout(function()	
		{	
			$(this).removeClass('HoveredPic');
		});
		
		$(this).click(function()
		{
			ChangeRotatorPic(index);
		});
	}); 
	
	$("#leftArrow button").click(function()
	{
		PreviousPicture();
	});
	
	$("#rightArrow button").click(function()
	{
		NextPicture();
	});
	
	StartRotator();
}); 

function StartRotator()
{
	refreshedIntervalId = window.setInterval("RotateImages()", 3500);
}

function RotateImages()
{
	var array = eval("imageURLArray");
	var container = eval("imgHolder");
	if (nextPictureToShow >= array.length)
	{
		nextPictureToShow = 0;
	}
	var urlToImg = "url(img/" + array[nextPictureToShow] + ")";
	$(container).css("background", urlToImg);
	$(container).css("backgroundRepeat", "no-repeat");
	$(container).css("backgroundPosition", "center");
	$(".SmallPic").removeClass('ClickedPic');
	$(".SmallPic").eq(nextPictureToShow).addClass('ClickedPic');
	
	nextPictureToShow = nextPictureToShow + 1;
}

function PreviousPicture()
{
	if (nextPictureToShow === 0 || nextPictureToShow === 1) // next is 1, but current is 0, i.e "<" must point to the last one; 0 if it hasn't been incremented yet
	{
		nextPictureToShow = (imageURLArray.length) - 1;
	}
	
	else
	{
		nextPictureToShow = nextPictureToShow - 2;
	}
	
	clearInterval(refreshedIntervalId);
	RotateImages();
	StartRotator();
}

function NextPicture()
{
	if (nextPictureToShow === 0) // when page is loaded for the first time
	{
		nextPictureToShow = nextPictureToShow + 1;
	}
	clearInterval(refreshedIntervalId);
	RotateImages();	
	StartRotator();
}

function ChangeRotatorPic(itemNumber)
{
	nextPictureToShow = itemNumber;
	clearInterval(refreshedIntervalId);
	RotateImages();	
	StartRotator();
}

