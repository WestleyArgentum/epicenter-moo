module Moo
    using Epicenter

    export historical_moos, suprise_cow

    moos = ["MOOOOOOO!", "*flicks tail*",
            "moo...", "MOO", "Leave me in peace, human.",
            "Get your hands off me you dirty human!"]

    historical_moos = Any[]

    function suprise_cow()
        reaction_moo = moos[rand(1:(length(moos)))]
        push!(historical_moos, reaction_moo)
        record(:historical_moos, length(historical_moos))

        return reaction_moo
    end
end

