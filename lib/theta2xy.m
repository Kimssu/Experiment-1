function [X, Y] = theta2xy(T, E)
	if ~exist('E', 'var') || isempty(E)
		E = ones(size(T));
	end

	X = cosd(T - 90) .* E;
	Y = sind(T - 90) .* E;
end