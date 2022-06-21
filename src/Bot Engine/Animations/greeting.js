import gsap from "gsap";

const body = ".botBox";
const l_brow = "#eyeLeft";
const l_eye = "#eyeLeft";
const r_brow = "#browRight";
const r_eye = "#eyeRight";
const smile = "#smile";

function _anim_Hi() {
    const anim = gsap.timeline();
    anim.from(body, {
        transform: 0,
        rotate: 0,
    });
    anim.to(body, {
        rotate: 10,
        duration: 0.5,
        transformOrigin: "bottom right",
    });
    anim.to(
        body,
        {
            rotate: -10,
            transformOrigin: "bottom left",
            duration: 0.5,
        },
        "-=0.05"
    );
    anim.to(body, {
        delay: 0.5,
        rotate: 0,
        transform: 0,
    });
}

export { _anim_Hi };
