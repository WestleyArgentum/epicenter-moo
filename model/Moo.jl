module Moo
    using Epicenter
    
    export historical_moos, suprise_cow
    
    moo = "MOOOOOOO!"
    
    historical_moos = Any[]
    
    function suprise_cow()
        push!(historical_moos, moo)
        record(:historical_moos, length(historical_moos))

        return moo
    end
end

