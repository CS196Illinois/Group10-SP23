;(function() {;
    var ρσ_modules = {};
    ρσ_modules.pythonize = {};
    ρσ_modules.random = {};

    (function(){
        function strings() {
            var string_funcs, exclude, name;
            string_funcs = set("capitalize strip lstrip rstrip islower isupper isspace lower upper swapcase center count endswith startswith find rfind index rindex format join ljust rjust partition rpartition replace split rsplit splitlines zfill".split(" "));
            if (!arguments.length) {
                exclude = (function(){
                    var s = ρσ_set();
                    s.jsset.add("split");
                    s.jsset.add("replace");
                    return s;
                })();
            } else if (arguments[0]) {
                exclude = Array.prototype.slice.call(arguments);
            } else {
                exclude = null;
            }
            if (exclude) {
                string_funcs = string_funcs.difference(set(exclude));
            }
            var ρσ_Iter0 = string_funcs;
            ρσ_Iter0 = ((typeof ρσ_Iter0[Symbol.iterator] === "function") ? (ρσ_Iter0 instanceof Map ? ρσ_Iter0.keys() : ρσ_Iter0) : Object.keys(ρσ_Iter0));
            for (var ρσ_Index0 of ρσ_Iter0) {
                name = ρσ_Index0;
                (ρσ_expr_temp = String.prototype)[(typeof name === "number" && name < 0) ? ρσ_expr_temp.length + name : name] = (ρσ_expr_temp = ρσ_str.prototype)[(typeof name === "number" && name < 0) ? ρσ_expr_temp.length + name : name];
            }
        };
        if (!strings.__module__) Object.defineProperties(strings, {
            __module__ : {value: "pythonize"}
        });

        ρσ_modules.pythonize.strings = strings;
    })();

    (function(){
        var ρσ_seed_state, ρσ_get_random_byte;
        ρσ_seed_state = (function(){
            var ρσ_d = {};
            ρσ_d["key"] = ρσ_list_decorate([]);
            ρσ_d["key_i"] = 0;
            ρσ_d["key_j"] = 0;
            return ρσ_d;
        }).call(this);
        ρσ_get_random_byte = (function() {
            var ρσ_anonfunc = function () {
                var ρσ_unpack;
                ρσ_seed_state.key_i = (ρσ_seed_state.key_i + 1) % 256;
                ρσ_seed_state.key_j = (ρσ_seed_state.key_j + (ρσ_expr_temp = ρσ_seed_state.key)[ρσ_bound_index(ρσ_seed_state.key_i, ρσ_expr_temp)]) % 256;
                ρσ_unpack = [(ρσ_expr_temp = ρσ_seed_state.key)[ρσ_bound_index(ρσ_seed_state.key_j, ρσ_expr_temp)], 
                (ρσ_expr_temp = ρσ_seed_state.key)[ρσ_bound_index(ρσ_seed_state.key_i, ρσ_expr_temp)]];
                (ρσ_expr_temp = ρσ_seed_state.key)[ρσ_bound_index(ρσ_seed_state.key_i, ρσ_expr_temp)] = ρσ_unpack[0];
                (ρσ_expr_temp = ρσ_seed_state.key)[ρσ_bound_index(ρσ_seed_state.key_j, ρσ_expr_temp)] = ρσ_unpack[1];
                return (ρσ_expr_temp = ρσ_seed_state.key)[ρσ_bound_index(((ρσ_expr_temp = ρσ_seed_state.key)[ρσ_bound_index(ρσ_seed_state.key_i, ρσ_expr_temp)] + (ρσ_expr_temp = ρσ_seed_state.key)[ρσ_bound_index(ρσ_seed_state.key_j, ρσ_expr_temp)]) % 256, ρσ_expr_temp)];
            };
            if (!ρσ_anonfunc.__module__) Object.defineProperties(ρσ_anonfunc, {
                __module__ : {value: "random"}
            });
            return ρσ_anonfunc;
        })();
        function seed() {
            var x = (arguments[0] === undefined || ( 0 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [ρσ_kwargs_symbol] === true)) ? seed.__defaults__.x : arguments[0];
            var ρσ_kwargs_obj = arguments[arguments.length-1];
            if (ρσ_kwargs_obj === null || typeof ρσ_kwargs_obj !== "object" || ρσ_kwargs_obj [ρσ_kwargs_symbol] !== true) ρσ_kwargs_obj = {};
            if (Object.prototype.hasOwnProperty.call(ρσ_kwargs_obj, "x")){
                x = ρσ_kwargs_obj.x;
            }
            var i, j, ρσ_unpack;
            ρσ_seed_state.key_i = ρσ_seed_state.key_j = 0;
            if (typeof x === "number") {
                x = x.toString();
            } else if (typeof x !== "string") {
                throw new TypeError("unhashable type: '" + typeof x + "'");
            }
            for (var ρσ_Index1 = 0; ρσ_Index1 < 256; ρσ_Index1++) {
                i = ρσ_Index1;
                (ρσ_expr_temp = ρσ_seed_state.key)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i] = i;
            }
            j = 0;
            for (var ρσ_Index2 = 0; ρσ_Index2 < 256; ρσ_Index2++) {
                i = ρσ_Index2;
                j = (j + (ρσ_expr_temp = ρσ_seed_state.key)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i] + x.charCodeAt(i % x.length)) % 256;
                ρσ_unpack = [(ρσ_expr_temp = ρσ_seed_state.key)[(typeof j === "number" && j < 0) ? ρσ_expr_temp.length + j : j], 
                (ρσ_expr_temp = ρσ_seed_state.key)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i]];
                (ρσ_expr_temp = ρσ_seed_state.key)[(typeof i === "number" && i < 0) ? ρσ_expr_temp.length + i : i] = ρσ_unpack[0];
                (ρσ_expr_temp = ρσ_seed_state.key)[(typeof j === "number" && j < 0) ? ρσ_expr_temp.length + j : j] = ρσ_unpack[1];
            }
        };
        if (!seed.__defaults__) Object.defineProperties(seed, {
            __defaults__ : {value: {x:(new Date).getTime()}},
            __handles_kwarg_interpolation__ : {value: true},
            __argnames__ : {value: ["x"]},
            __module__ : {value: "random"}
        });

        seed();
        function random() {
            var n, m, i;
            n = 0;
            m = 1;
            for (var ρσ_Index3 = 0; ρσ_Index3 < 8; ρσ_Index3++) {
                i = ρσ_Index3;
                n += ρσ_get_random_byte() * m;
                m *= 256;
            }
            return n / 0x10000000000000000;
        };
        if (!random.__module__) Object.defineProperties(random, {
            __module__ : {value: "random"}
        });

        function randrange() {
            var start, stop, step, width, n;
            if (arguments.length === 1) {
                return randbelow(int(arguments[0]));
            }
            start = int(arguments[0]);
            stop = int(arguments[1]);
            if (arguments.length < 3) {
                step = 1;
            } else {
                step = int(arguments[2]);
            }
            width = stop - start;
            if (step === 1) {
                if (width > 0) {
                    return start + randbelow(width);
                }
                throw new ValueError("empty range for randrange()");
            }
            if (step > 0) {
                n = Math.floor((width + step - 1) / step);
            } else if (step < 0) {
                n = Math.floor((width + step + 1) / step);
            } else {
                throw new ValueError("zero step for randrange()");
            }
            if (n <= 0) {
                throw new ValueError("empty range in randrange(" + ρσ_str.format("{}", start) + ", " + ρσ_str.format("{}", stop) + ", " + ρσ_str.format("{}", step) + ")");
            }
            return start + step * randbelow(n);
        };
        if (!randrange.__module__) Object.defineProperties(randrange, {
            __module__ : {value: "random"}
        });

        function randint(a, b) {
            return int(random() * (b - a + 1) + a);
        };
        if (!randint.__argnames__) Object.defineProperties(randint, {
            __argnames__ : {value: ["a", "b"]},
            __module__ : {value: "random"}
        });

        function uniform(a, b) {
            return random() * (b - a) + a;
        };
        if (!uniform.__argnames__) Object.defineProperties(uniform, {
            __argnames__ : {value: ["a", "b"]},
            __module__ : {value: "random"}
        });

        function randbelow(n) {
            return Math.floor(random() * n);
        };
        if (!randbelow.__argnames__) Object.defineProperties(randbelow, {
            __argnames__ : {value: ["n"]},
            __module__ : {value: "random"}
        });

        function choice(seq) {
            if (seq.length > 0) {
                return seq[ρσ_bound_index(randbelow(seq.length), seq)];
            } else {
                throw new IndexError;
            }
        };
        if (!choice.__argnames__) Object.defineProperties(choice, {
            __argnames__ : {value: ["seq"]},
            __module__ : {value: "random"}
        });

        function shuffle() {
            var x = ( 0 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [ρσ_kwargs_symbol] === true) ? undefined : arguments[0];
            var random_f = (arguments[1] === undefined || ( 1 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [ρσ_kwargs_symbol] === true)) ? shuffle.__defaults__.random_f : arguments[1];
            var ρσ_kwargs_obj = arguments[arguments.length-1];
            if (ρσ_kwargs_obj === null || typeof ρσ_kwargs_obj !== "object" || ρσ_kwargs_obj [ρσ_kwargs_symbol] !== true) ρσ_kwargs_obj = {};
            if (Object.prototype.hasOwnProperty.call(ρσ_kwargs_obj, "random_f")){
                random_f = ρσ_kwargs_obj.random_f;
            }
            var j, ρσ_unpack, i;
            for (var ρσ_Index4 = 0; ρσ_Index4 < x.length; ρσ_Index4++) {
                i = ρσ_Index4;
                j = Math.floor(random_f() * (i + 1));
                ρσ_unpack = [x[(typeof j === "number" && j < 0) ? x.length + j : j], x[(typeof i === "number" && i < 0) ? x.length + i : i]];
                x[(typeof i === "number" && i < 0) ? x.length + i : i] = ρσ_unpack[0];
                x[(typeof j === "number" && j < 0) ? x.length + j : j] = ρσ_unpack[1];
            }
            return x;
        };
        if (!shuffle.__defaults__) Object.defineProperties(shuffle, {
            __defaults__ : {value: {random_f:random}},
            __handles_kwarg_interpolation__ : {value: true},
            __argnames__ : {value: ["x", "random_f"]},
            __module__ : {value: "random"}
        });

        function sample(population, k) {
            var x, j, ρσ_unpack, i;
            x = population.slice();
            for (var ρσ_Index5 = population.length - 1; ρσ_Index5 > population.length - k - 1; ρσ_Index5-=1) {
                i = ρσ_Index5;
                j = Math.floor(random() * (i + 1));
                ρσ_unpack = [x[(typeof j === "number" && j < 0) ? x.length + j : j], x[(typeof i === "number" && i < 0) ? x.length + i : i]];
                x[(typeof i === "number" && i < 0) ? x.length + i : i] = ρσ_unpack[0];
                x[(typeof j === "number" && j < 0) ? x.length + j : j] = ρσ_unpack[1];
            }
            return x.slice(population.length - k);
        };
        if (!sample.__argnames__) Object.defineProperties(sample, {
            __argnames__ : {value: ["population", "k"]},
            __module__ : {value: "random"}
        });

        ρσ_modules.random.ρσ_seed_state = ρσ_seed_state;
        ρσ_modules.random.ρσ_get_random_byte = ρσ_get_random_byte;
        ρσ_modules.random.seed = seed;
        ρσ_modules.random.random = random;
        ρσ_modules.random.randrange = randrange;
        ρσ_modules.random.randint = randint;
        ρσ_modules.random.uniform = uniform;
        ρσ_modules.random.randbelow = randbelow;
        ρσ_modules.random.choice = choice;
        ρσ_modules.random.shuffle = shuffle;
        ρσ_modules.random.sample = sample;
    })();
    async function __main__() {
    "use strict";
        var display = canvas;
        var scene = canvas();

        var version, print, arange, __name__, type, ρσ_ls, fish, tank, fish_vel, fish_ang, pellet, gravity;
        version = ρσ_list_decorate([ "3.2", "glowscript" ]);
        Array.prototype['+'] = function(r) {return this.concat(r)}
        Array.prototype['*'] = function(r) {return __array_times_number(this, r)}
        window.__GSlang = "vpython";
        print = GSprint;
        arange = range;
        __name__ = "__main__";
        type = pytype;
        var strings = ρσ_modules.pythonize.strings;

        strings();
        var random = ρσ_modules.random;

        "7";
        fish = ρσ_interpolate_kwargs.call(this, cylinder, [ρσ_desugar_kwargs({pos: vec(0, 0, 0), axis: vec(1, 0, 0), radius: .2, color: color.orange, texture: "https://png.pngtree.com/png-clipart/20220624/ourmid/pngtree-fish-sea-fish-fish-png-image_5318367.png"})]);
        "8";
        tank = ρσ_interpolate_kwargs.call(this, box, [ρσ_desugar_kwargs({pos: vec(0, 0, 0), length: 15, height: 15, width: 15, opacity: .2, color: color.blue})]);
        "9";
        fish.pos = vec(0, 0, 0);
        "10";
        fish.color = color.white;
        "11";
        fish_vel = 0;
        "12";
        fish_ang = vec(0, 0, 0);
        "13";
        pellet = ρσ_interpolate_kwargs.call(this, sphere, [ρσ_desugar_kwargs({pos: vector(0, 0, 0), radius: .5, color: color.red})]);
        "14";
        gravity = vec(0, 1["-u"]()["*"](.002), 0);
        "15";
        pellet.visible = false;
        "19";
        async function B(b) {
            "20";
            pellet.visible = !pellet.visible;
            "21";
            pellet.pos = vec(0, 0, 0);
        };
        if (!B.__argnames__) Object.defineProperties(B, {
            __argnames__ : {value: ["b"]},
            __module__ : {value: null}
        });

        "23";
        ρσ_interpolate_kwargs.call(this, button, [ρσ_desugar_kwargs({bind: B, text: "Add pellet"})]);
        "24";
        scene.append_to_caption("\n\n");
        "27";
        while (true) {
            "28";
            (await rate(300));
            "31";
            if (fish.pos.x["<"](1["-u"]()["*"](6)) || fish.pos.x[">"](6)) {
                "32";
                fish_ang = .02["*"](cross(vec(0, 0, 1), fish.axis));
                "33";
            } else if (fish.pos.y["<"](1["-u"]()["*"](6)) || fish.pos.y[">"](6)) {
                "34";
                fish_ang = .02["*"](cross(vec(1, 0, 0), fish.axis));
                "35";
            } else if (fish.pos.z["<"](1["-u"]()["*"](6)) || fish.pos.z[">"](6)) {
                "36";
                fish_ang = .02["*"](cross(vec(0, 1, 0), fish.axis));
                "37";
            } else if ((pellet.visible === true || typeof pellet.visible === "object" && ρσ_equals(pellet.visible, true)) && mag(fish.axis["+"](norm(fish.pos)))[">"](.3)) {
                "38";
                fish_ang = .01["*"](cross(cross(fish.axis, 1["-u"]()["*"](fish.pos["-"](1["*"](pellet.pos)))), fish.axis["-"](1["*"](fish.pos["-"](1["*"](pellet.pos))))));
                "39";
                if (mag(fish.pos["-"](1["*"](pellet.pos)))["<"](.5)) {
                    "40";
                    pellet.visible = !pellet.visible;
                    "41";
                }
            } else {
                "45";
                fish_ang = vec(random.uniform(1["-u"]()["*"](.001), .001), random.uniform(1["-u"]()["*"](.01), .01), random.uniform(1["-u"]()["*"](.01), .01));
                "46";
                fish_vel=fish_vel["+"](random.uniform(1["-u"]()["*"](.001), .001));
                "49";
            }
            if (abs(fish_vel)[">"](.02)) {
                "50";
                if (fish_vel[">"](0)) {
                    "51";
                    fish_vel = .02;
                    "52";
                } else {
                    "53";
                    fish_vel = 1["-u"]()["*"](.02);
                }
            }
            "57";
            fish.axis = norm(fish_ang["+"](fish.axis));
            "58";
            fish.pos=fish.pos["+"](abs(fish_vel)["*"](norm(fish.axis)));
            "59";
            pellet.pos=pellet.pos["+"](gravity);
            "63";
            if (fish.pos.x["<"](1["-u"]()["*"](7.5))) {
                "64";
                fish.pos.x = 1["-u"]()["*"](7.5);
                "65";
            } else if (fish.pos.x[">"](7.5)) {
                "66";
                fish.pos.x = 7.5;
                "68";
            }
            if (fish.pos.y["<"](1["-u"]()["*"](7.5))) {
                "69";
                fish.pos.y = 1["-u"]()["*"](7.5);
                "70";
            } else if (fish.pos.y[">"](7.5)) {
                "71";
                fish.pos.y = 7.5;
                "73";
            }
            if (pellet.pos.y["<"](1["-u"]()["*"](7.5))) {
                "74";
                pellet.pos.y = 1["-u"]()["*"](7.5);
                "75";
            } else if (pellet.pos.y[">"](7.5)) {
                "76";
                pellet.pos.y = 7.5;
                "78";
            }
            if (fish.pos.z["<"](1["-u"]()["*"](7.5))) {
                "79";
                fish.pos.z = 1["-u"]()["*"](7.5);
                "80";
            } else if (fish.pos.z[">"](7.5)) {
                "81";
                fish.pos.z = 7.5;
            }
        }
    };
    if (!__main__.__module__) Object.defineProperties(__main__, {
        __module__ : {value: null}
    });

    ;$(function(){ window.__context = { glowscript_container: $("#glowscript").removeAttr("id") }; __main__() })})()
