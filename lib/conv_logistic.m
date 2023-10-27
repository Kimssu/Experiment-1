function N = conv_logistic(M, k, x0)
	if ~exist('x0', 'var') || isempty(x0)
		x0 = 0;
	end

	N = 1 ./ (1 + exp(-k .* (M - x0)));
end