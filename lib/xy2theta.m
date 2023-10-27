function T = xy2theta(X, Y)
	T = mod(atan2d(Y, X) + 90, 360);
end