clear;
addpath('lib');

imgSize = 400;
fixedL = 74;
scaleAB = 40;

mapT = map_pivotal(400);
[mapA, mapB] = theta2xy(mapT);
mapA = mapA * scaleAB;
mapB = mapB * scaleAB;

mapLAB = cat(3, repmat(fixedL, imgSize), mapA, mapB);
mapRGB = lab2rgb(mapLAB, 'ColorSpace', 'srgb', 'WhitePoint', 'd65');

mapWheel = conv_shape(map_radial(imgSize), imgSize * .475) .* ...
	(1 - conv_shape(map_radial(imgSize), imgSize * .225));

imshow((1 - mapWheel) + (mapRGB .* mapWheel));

fprintf('R: %d - %d\n', round(min(mapRGB(:, :, 1), [], 'all') * 255), round(max(mapRGB(:, :, 1), [], 'all') * 255));
fprintf('G: %d - %d\n', round(min(mapRGB(:, :, 2), [], 'all') * 255), round(max(mapRGB(:, :, 2), [], 'all') * 255));
fprintf('B: %d - %d\n', round(min(mapRGB(:, :, 3), [], 'all') * 255), round(max(mapRGB(:, :, 3), [], 'all') * 255));
