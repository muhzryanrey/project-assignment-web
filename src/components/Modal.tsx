import React, { FC, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { Typography, Grid, Modal, Button, Box } from "@material-ui/core";
import { useRouter } from "next/router";
import { typeColorGenerator } from "@helpers/typeColor";

const PokemonModal = ({
    selectedPokemon,
    open,
    handleClose,
}: {
    selectedPokemon: any;
    open: boolean;
    handleClose: Function;
}) => {
    const { t } = useTranslation();
    const router = useRouter();

    return (
        <Modal
            open={open}
            onClose={() => handleClose()}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "20px",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    width: "80%",
                    backgroundColor: "white",
                    padding: "16px 20px",
                }}
            >
                {selectedPokemon && (
                    <Box component="section" gridColumnGap={40}>
                        <Grid container>
                            <Grid item xs={4}>
                                <img
                                    src={
                                        selectedPokemon.sprites.other[
                                            "official-artwork"
                                        ].front_default
                                    }
                                    style={{
                                        width: "95%",
                                    }}
                                    alt="Pokemon Pictures"
                                />
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={7}>
                                <Grid container>
                                    <Grid item xs={11}>
                                        <Typography
                                            style={{ fontSize: "60px" }}
                                        >
                                            {selectedPokemon.name[0].toUpperCase() +
                                                selectedPokemon.name.slice(1)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography
                                            style={{
                                                fontSize: "30px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <a onClick={() => handleClose()}>
                                                X
                                            </a>
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container style={{ marginTop: "35px" }}>
                                    <Grid item xs={2}>
                                        <Typography
                                            style={{ fontWeight: "bold" }}
                                        >
                                            Weight:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>
                                            {selectedPokemon.weight}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography
                                            style={{ fontWeight: "bold" }}
                                        >
                                            Height:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>
                                            {selectedPokemon.height}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container style={{ marginTop: "20px" }}>
                                    <Grid item xs={2}>
                                        <Typography
                                            style={{ fontWeight: "bold" }}
                                        >
                                            Abilities:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        {selectedPokemon.abilities.map(
                                            (el, i) => {
                                                return (
                                                    <Typography key={i}>
                                                        &#x2022;{" "}
                                                        {el.ability.name[0].toUpperCase() +
                                                            el.ability.name.slice(
                                                                1,
                                                            )}
                                                    </Typography>
                                                );
                                            },
                                        )}
                                    </Grid>
                                </Grid>
                                <Typography style={{ marginTop: "20px" }}>
                                    <span
                                        style={{
                                            marginRight: "5px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Type:
                                    </span>
                                    {selectedPokemon.types.map((type, i) => {
                                        return (
                                            <span
                                                key={i}
                                                style={{
                                                    margin: "0 5px 0 5px",
                                                    padding: "5px 10px",
                                                    background:
                                                        typeColorGenerator(
                                                            type.type.name,
                                                        ),
                                                    borderRadius: "15px",
                                                    color: "white",
                                                }}
                                            >
                                                {type.type.name}
                                            </span>
                                        );
                                    })}
                                </Typography>
                                <Button
                                    style={{
                                        backgroundColor: "#E6AB09",
                                        color: "white",
                                        textTransform: "none",
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                        fontSize: "16px",
                                        marginTop: "30px",
                                        borderRadius: "10px",
                                        paddingLeft: "20px",
                                        paddingRight: "20px",
                                    }}
                                    variant="contained"
                                    onClick={() =>
                                        router.push(
                                            `/pokemon/detail/${selectedPokemon.name}`,
                                        )
                                    }
                                >
                                    More Detail
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </div>
        </Modal>
    );
};

export default PokemonModal;
