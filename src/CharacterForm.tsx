import { forwardRef } from "react";
import owData from "../data/data.json";
import { useSearchParams } from "react-router";

interface CharacterFormProps
{
    name: string
    displayName: string
    setVideo: (user: string) => void
}

const CharacterForm = forwardRef((
    { name, displayName, setVideo }: CharacterFormProps,
    _
) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchUser = searchParams.get("c");
    let validUsers
    if (searchUser)
    {
        let u = owData.find(x => x.name === searchUser);
        if (u) validUsers = [ u ];
    }

    if (!validUsers) validUsers = owData.filter(x => x.characters.includes(name));

    return <div className="card box">
        <img className="card-img" src={`/img/characters/${name}.png`} />
        <div className="card-name">{ displayName }</div>
        <div className="flex">
            { validUsers.map(x => <div key={x.name} className="button" onClick={() => { setVideo(x.name) }}><img  className="profile-img" src={`data/profiles/${x.image}`} /></div>)  }
        </div>
    </div>
});

export default CharacterForm;