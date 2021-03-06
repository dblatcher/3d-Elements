import * as E3d from '../base/baseE3d'
import * as faceStyling from '../base/faceStyling'

function setUpFaces (size, units='px', facePattern=null) {
	var faces = this.children;
	var transformString;
	
	var hexWidth = size[0]*(2/Math.pow(3,1/2));		
	var hexCorner = (50/(Math.pow(3,1/2)));
	hexCorner = 25;
	var hexagonalCornerArray = [ 
	[hexCorner,0],
	[100-hexCorner, 0],
	[100,50],
	[100-hexCorner,100],
	[hexCorner, 100],
	[0,50] 
	];

	const shapeStyle = {
		"width" : `${hexWidth}${units}`,
        "height" : `${size[0]}${units}`,
    }
    let faceStyles = faceStyling.makeList(8)

	faceStyles[0].width  = hexWidth + units;	
	faceStyles[0].height = size[0] + units;
	transformString = '';
	transformString += 'translateZ(' + size[1]/2 + units +')'
	faceStyles[0].transform = transformString
	faceStyling.prependSvg(faces[0],hexagonalCornerArray, 0 ,facePattern);
	
	for (var f=1;f<7;f++) {	
		faceStyles[f].width  = size[0]/Math.pow(3,1/2)  + units;		
		faceStyles[f].height = size[1]+ units;
		transformString = '';
		transformString += 'translateY(' + -size[1]*.5 + units + ')';
		transformString += 'translateY(' + size[0]*.5 + units + ')';			
		transformString += 'translateX(' + -(size[0]/Math.pow(3,1/2))*.5 + units + ')';
		transformString += 'translateX(' + hexWidth*.5 + units + ')';
		transformString += 'rotateX(90deg) ';
		transformString += 'rotateY('+ 60*(f-1) +'deg) ';
		transformString += 'translateZ(' + size[0]/(2) + units + ')';	
		faceStyles[f].transform = transformString
	}
	
	faceStyles[7].width  = hexWidth + units;		
	faceStyles[7].height = size[0] + units;
	faceStyles[7].transform = "rotateY(180deg) translateZ(" + size[1]/2 + units + ")";
	faceStyling.prependSvg(faces[7],hexagonalCornerArray, 7, facePattern);
	
	faceStyling.apply(this, faceStyles, shapeStyle)
};

export default E3d.defineShapeType('hexagon',8, setUpFaces)