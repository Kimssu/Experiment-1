clear;
addpath('lib');

%colorT = 90:2:270;
colorT = 0:1:359;
fixedL = 74;
scaleAB = 40;


[colorA, colorB] = theta2xy(colorT);
colorA = colorA * scaleAB;
colorB = colorB * scaleAB;

labmat = [repmat(fixedL, length(colorT), 1), colorA', colorB'];
rgbmat = lab2rgb(labmat, 'ColorSpace', 'srgb', 'WhitePoint', 'd65');
rgbmat = round(rgbmat * 255);


fprintf('const colorSpace = [''#%02x%02x%02x''', rgbmat(1, 1), rgbmat(1, 2), rgbmat(1, 3));
for i = 2:size(rgbmat, 1)
	fprintf(',''#%02x%02x%02x''', rgbmat(i, 1), rgbmat(i, 2), rgbmat(i, 3));
end
fprintf('];\n');
