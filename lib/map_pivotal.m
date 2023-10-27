function T = map_pivotal(rows, cols, theta)
	if ~exist('cols', 'var') || isempty(cols)
		cols = rows;
	end
	if ~exist('theta', 'var') || isempty(theta)
		theta = 0;
	end

	[X, Y] = map_linear(rows, cols, theta);
	T = xy2theta(X, Y);
end