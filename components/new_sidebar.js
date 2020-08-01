import Select from "react-select";
import { useState } from "react";
import Link from "next/link";
const Sidebar = React.forwardRef((props, ref) => {
  const [year, setYear] = useState(false);
  const [module, setModule] = useState(false);
  const toggle = props.toggle ? "" : "hidden sm:block";
  var options = props.tree.children.map((x) => ({
    value: x.name,
    label: x.name.replace(/_/g, " "),
  }));
  function handleChange(selected) {
    setModule(false);
    setYear(selected.value);
  }

  function Module_layer() {
    return (
      <ul className="divide-y divide-gray-400">
        {year &&
          props.tree.children
            .find((x) => x.name === year)
            .children.map((x) => x.name)
            .map((element) => (
              <li key={element} className="p-2 text-center">
                <button onClick={() => setModule(element)}>
                  {element.replace(/_/g, " ")}
                </button>
              </li>
            ))}
      </ul>
    );
  }

  function unsetModule() {
    setModule(false);
  }
  function Submodule_List() {
    return (
      <ul className="divide-y-4 divide-transparent pt-4">
        {props.tree.children
          .find((x) => x.name === year)
          .children.find((x) => x.name === module)
          .children.map(function (elem) {
            if (elem.type !== "directory") {
              return (
                <li className="hover:bg-gray-200 py-1 pl-2 rounded">
                  <Link
                    href={
                      "./" +
                      year +
                      "/" +
                      module +
                      "/" +
                      elem.name.replace(/\.[^/.]+$/, "")
                    }
                  >
                    <a>
                      {elem.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ")}
                    </a>
                  </Link>
                </li>
              );
            } else {
              return (
                <li className="text-xl font-semibold">
                  {elem.name.replace(/_/g, " ")}
                  <ul className="text-base font-normal">
                    {elem.children.map((lecture) => (
                      <li className="pl-2 py-1 hover:bg-gray-200 rounded">
                        <Link
                          href="/[...slug]"
                          as={
                            "/" +
                            year +
                            "/" +
                            module +
                            "/" +
                            elem.name +
                            "/" +
                            lecture.name.replace(/\.[^/.]+$/, "")
                          }
                        >
                          <a>
                            {lecture.name
                              .replace(/\.[^/.]+$/, "")
                              .replace(/_/g, " ")}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }
          })}
      </ul>
    );
  }

  function Submodule_layer() {
    return (
      <>
        <div className="grid grid-cols-8 gap-2">
          <button className="col-span-1" onClick={unsetModule}>
            <svg
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6"
            >
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
          </button>
          <h1 className="col-span-7 text-2xl">{module.replace(/_/g, " ")}</h1>
        </div>
        <hr className="mt-2 border-2 border-gray-400" />
        <Submodule_List />
      </>
    );
  }

  function Switching() {
    if (module) {
      return <Submodule_layer />;
    } else {
      return <Module_layer />;
    }
  }

  return (
    <div
      className={`${toggle} absolute sm:relative w-full max-w-xs z-10 main-content`}
      ref={ref}
    >
      <div className="h-full p-4 overflow-x-hidden overflow-y-auto text-black bg-white border-r">
        <Select
          options={options}
          onChange={handleChange}
          isClearable={false}
          isSearchable={false}
          instanceId={1}
        />
        <hr className="mt-4 mb-4" />
        <Switching />
      </div>
    </div>
  );
});
export default Sidebar;
