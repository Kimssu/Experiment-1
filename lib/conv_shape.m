function N = conv_shape(M, r, pp)
	if ~exist('pp', 'var') || isempty(pp)
		pp = 1;
	end

	N = conv_logistic(M, -12.465 ./ pp, r);
end