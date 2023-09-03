import { NumberInput } from "../../../components/NumberInput/number";
import "./create.css"

export function CreateLobby(props) {
    const createLobby = (event) => {
        // Prevent page refresh
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = [...formData.entries()];
        let query = data
            .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1].toString())}`)
            .join('&');
        if (event.submitter.id === "create-public") {
            query += "&public=true";
        }

        fetch('http://localhost:8080/v1/lobby?' + query, {
            credentials: 'include',
            method: 'POST',
        }).then((response) => {
            if (response.status === 200 || response.status === 201) {
                response.json().then((data) => {
                    props.joinLobby(data.lobbyId);
                });
            }
        }).catch((error) => {
            console.error(error);
        });

        return true;
    };

    return (
        <div class="home-choice" >
            <div class="home-choice-inner">
                <div class="home-choice-header">
                    <div class="home-choice-title">Create Lobby</div>
                </div>
                <form onSubmit={createLobby} id="lobby-create">
                    <b>Language</b>
                    <select class="input-item" name="language" placeholder="Choose your language">
                        {/* FIXME Get languages from server */}
                        <option value="english" selected>English (US)</option>
                        <option value="english_gb" selected>English (GB)</option>
                        <option value="german" selected>German</option>
                    </select>
                    <b>Drawing Time</b>
                    <NumberInput type="number" name="drawing_time" min="60" max="300" value="120" />
                    <b>Rounds</b>
                    <NumberInput type="number" name="rounds" min="1" max="20" value="4" />
                    <b>Max Players</b>
                    <NumberInput type="number" name="max_players" min="2" max="24" value="12" />
                    <b>Max Players per IP</b>
                    <NumberInput type="number" name="clients_per_ip_limit" min="1" max="24" value="4" />
                    <b>Custom Words Per Turn</b>
                    <NumberInput name="custom_words_per_turn" min="1" max="3" value="3" />
                    <b>Custom Words</b>
                    <textarea class="input-item" name="custom_words" placeholder="Comma, separated, word, list, here"></textarea>
                </form>
                <div style="display: flex; flex-direction: row; gap: 0.5rem;">
                    <button id="create-public" form="lobby-create" type="submit" class="create-button">
                        Create Public Lobby
                    </button>
                    <button form="lobby-create" type="submit" class="create-button">
                        Create Private Lobby
                    </button>
                </div>
            </div>
        </div >
    )
}