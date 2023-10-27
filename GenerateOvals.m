clear;

imgPath = 'imgs';

imgSize = 100;
baseD   = 50;

ovalRatios = logspace(log10(1/3), log10(3), 91);


if ~exist(imgPath, 'dir')
	mkdir(imgPath);
end

hFig = figure('Color', [0 0 0]);
imshow(zeros(imgSize * 2));
for i = 1:length(ovalRatios)
	ovalH = baseD * sqrt(ovalRatios(i));
	ovalW = baseD / sqrt(ovalRatios(i));

	t = -180:0.01:180;
	x = imgSize + (ovalW * cosd(t));
	y = imgSize + (ovalH * sind(t));

	imshow(zeros(imgSize * 2));
	patch(x, y, [1 1 1], 'LineStyle', 'none');
	imgmat = rgb2gray(im2double(getframe(hFig.Children(1)).cdata));
	imgmat = imresize(imgmat, 1/2);

	filename = sprintf('oval-%02d.png', i - 1);
	imwrite(ones(imgSize), fullfile(imgPath, filename), 'Alpha', 1 - imgmat);
end
