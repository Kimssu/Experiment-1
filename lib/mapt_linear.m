function [X, Y] = mapt_linear(rows, cols, theta)
	if ~exist('cols', 'var') || isempty(cols)
		cols = rows;
	end
	if ~exist('theta', 'var') || isempty(theta)
		theta = 0;
	end

	[mx, my] = meshgrid( ...
		(1:cols) - (1 + cols) / 2, ...
		(1:rows) - (1 + rows) / 2);
	if mod(theta, 360) == 0
		X = mx;
		Y = my;
	else
		X = mx * cosd(theta) + my * sind(theta);
		Y = mx * cosd(theta + 90) + my * sind(theta + 90);
	end
end