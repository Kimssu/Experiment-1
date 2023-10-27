clear;

imgPath = 'imgs';

imgSize = 100;
barT = 10;
barL = 90;

barAngles = 45:-1:-45;


imgHalf = imgSize / 2;
idxT = (1:barT) - (barT / 2);
idxL = (1:barL) - (barL / 2);

barImg = zeros(imgSize);
barImg(round(imgHalf + idxL), round(imgHalf + idxT)) = 1;


if ~exist(imgPath, 'dir')
	mkdir(imgPath);
end

for i = 1:length(barAngles)
	alphamat = 1 - imrotate(barImg, barAngles(i), 'nearest', 'crop');
	filename = sprintf('bar-%02d.png', i - 1);
	imwrite(ones(imgSize), fullfile(imgPath, filename), 'Alpha', alphamat);
end
