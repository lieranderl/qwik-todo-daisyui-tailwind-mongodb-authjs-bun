import { component$, $, useContext } from "@builder.io/qwik";
import { toastManagerContext } from "../toast/toastStack";

export const TestContent = component$(() => {
  const toastManager = useContext(toastManagerContext);
  const addToast = $(() => {
    toastManager.addToast({
      message: `Error TEST sjhsjhdfgjhsdgh fjhsdgjhfgsdjhfgjsdgfjs fsdjhfg jsdhfg jsdh`,
      type: "error",
      autocloseTime: 20000,
    });
    toastManager.addToast({
      message: `Info TEST`,
      type: "info",
      autocloseTime: 10000,
    });
    toastManager.addToast({
      message: `Warning TEST`,
      type: "warning",
      autocloseTime: 15000,
    });
    toastManager.addToast({
      message: `Success TEST`,
      type: "success",
      autocloseTime: 12000,
    });
  });
  return (
    <>
      <h1>Hi 👋</h1>

      <p>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </p>
      <div class="grid grid-cols-1 gap-2">
        <div class="flex flex-wrap gap-2">
          <button class="btn btn-primary btn-xs">Primary</button>
          <button class="btn btn-primary btn-sm">Primary</button>
          <button class="btn btn-primary">Primary</button>
          <button class="btn btn-primary btn-lg">Primary</button>
          <button class="btn btn-secondary btn-sm">Secondary</button>
          <button class="btn btn-accent btn-sm">Accent</button>
          <button class="btn btn-info btn-sm">Info</button>
          <button class="btn btn-success btn-sm ">Success</button>
          <button class="btn btn-warning btn-sm ">Warning</button>
          <button class="btn btn-error btn-sm ">Error</button>
        </div>

        <div class="flex flex-wrap gap-2">
          <button class="btn btn-primary btn-outline btn-sm">Primary</button>
          <button class="btn btn-secondary btn-outline btn-sm">
            Secondary
          </button>
          <button class="btn btn-accent btn-outline btn-sm">Accent</button>
          <button class="btn btn-info btn-outline btn-sm">Info</button>
          <button class="btn btn-success btn-outline btn-sm">Success</button>
          <button class="btn btn-warning btn-outline btn-sm">Warning</button>
          <button class="btn btn-error btn-outline btn-sm">Error</button>
        </div>
        <div>
          <button
            class="btn btn-primary btn-outline btn-sm"
            onClick$={() => {
              addToast();
            }}
          >
            Toast
          </button>
          <div class="dropdown">
            <label tabIndex={0} class="btn btn-primary btn-sm mx-1">
              Dropdown
            </label>
            <ul
              tabIndex={0}
              class="menu dropdown-content rounded-box z-[1] w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
          <select class="select select-primary select-sm w-full max-w-xs">
            <option disabled selected>
              What is the best TV show?
            </option>
            <option>Game of Thrones</option>
            <option>Lost</option>
            <option>Breaking Bad</option>
            <option>Walking Dead</option>
          </select>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sed
          ipsam, sit aliquid quis nihil voluptatum animi, quo dolores
          voluptatibus omnis provident nesciunt? Sunt aut minima dolorum tenetur
          repudiandae? Totam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sed
          ipsam, sit aliquid quis nihil voluptatum animi, quo dolores
          voluptatibus omnis provident nesciunt? Sunt aut minima dolorum tenetur
          repudiandae? Totam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sed
          ipsam, sit aliquid quis nihil voluptatum animi, quo dolores
          voluptatibus omnis provident nesciunt? Sunt aut minima dolorum tenetur
          repudiandae? Totam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sed
          ipsam, sit aliquid quis nihil voluptatum animi, quo dolores
          voluptatibus omnis provident nesciunt? Sunt aut minima dolorum tenetur
          repudiandae? Totam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sed
          ipsam, sit aliquid quis nihil voluptatum animi, quo dolores
          voluptatibus omnis provident nesciunt? Sunt aut minima dolorum tenetur
          repudiandae? Totam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sed
          ipsam, sit aliquid quis nihil voluptatum animi, quo dolores
          voluptatibus omnis provident nesciunt? Sunt aut minima dolorum tenetur
          repudiandae? Totam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sed
          ipsam, sit aliquid quis nihil voluptatum animi, quo dolores
          voluptatibus omnis provident nesciunt? Sunt aut minima dolorum tenetur
          repudiandae? Totam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sed
          ipsam, sit aliquid quis nihil voluptatum animi, quo dolores
          voluptatibus omnis provident nesciunt? Sunt aut minima dolorum tenetur
          repudiandae? Totam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sed
          ipsam, sit aliquid quis nihil voluptatum animi, quo dolores
          voluptatibus omnis provident nesciunt? Sunt aut minima dolorum tenetur
          repudiandae? Totam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sed
          ipsam, sit aliquid quis nihil voluptatum animi, quo dolores
          voluptatibus omnis provident nesciunt? Sunt aut minima dolorum tenetur
          repudiandae? Totam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sed
          ipsam, sit aliquid quis nihil voluptatum animi, quo dolores
          voluptatibus omnis provident nesciunt? Sunt aut minima dolorum tenetur
          repudiandae? Totam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sed
          ipsam, sit aliquid quis nihil voluptatum animi, quo dolores
          voluptatibus omnis provident nesciunt? Sunt aut minima dolorum tenetur
          repudiandae? Totam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sed
          ipsam, sit aliquid quis nihil voluptatum animi, quo dolores
          voluptatibus omnis provident nesciunt? Sunt aut minima dolorum tenetur
          repudiandae? Totam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sed
          ipsam, sit aliquid quis nihil voluptatum animi, quo dolores
          voluptatibus omnis provident nesciunt? Sunt aut minima dolorum tenetur
          repudiandae? Totam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sed
          ipsam, sit aliquid quis nihil voluptatum animi, quo dolores
          voluptatibus omnis provident nesciunt? Sunt aut minima dolorum tenetur
          repudiandae? Totam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sed
          ipsam, sit aliquid quis nihil voluptatum animi, quo dolores
          voluptatibus omnis provident nesciunt? Sunt aut minima dolorum tenetur
          repudiandae? Totam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sed
          ipsam, sit aliquid quis nihil voluptatum animi, quo dolores
          voluptatibus omnis provident nesciunt? Sunt aut minima dolorum tenetur
          repudiandae? Totam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sed
          ipsam, sit aliquid quis nihil voluptatum animi, quo dolores
          voluptatibus omnis provident nesciunt? Sunt aut minima dolorum tenetur
          repudiandae? Totam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sed
          ipsam, sit aliquid quis nihil voluptatum animi, quo dolores
          voluptatibus omnis provident nesciunt? Sunt aut minima dolorum tenetur
          repudiandae? Totam.
        </p>
      </div>
    </>
  );
});
