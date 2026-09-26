import { examples } from "../../example/examples";

export function ExampleSelector({ onSelect }) {
    return (
        <select
            className="example-selector"
            defaultValue=""
            onChange={(event) => {
                const name = event.target.value;

                if (!name) return;

                onSelect(examples[name]);

                // Reset the select back to "Examples"
                event.target.value = "";
            }}
        >
            <option value="" disabled>
                Examples
            </option>

            {Object.keys(examples).map((name) => (
                <option key={name} value={name}>
                    {name}
                </option>
            ))}
        </select>
    );
}