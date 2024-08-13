package com.example;

import java.util.Date;

public class Match {
    private int matchId;
    private int player1Id;
    private int player2Id;
    private Date startTime;
    private Date endTime;
    private int winnerId;

    // Constructor, getters, and setters

    public Match(int matchId, int player1Id, int player2Id, Date startTime, Date endTime, int winnerId) {
        this.matchId = matchId;
        this.player1Id = player1Id;
        this.player2Id = player2Id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.winnerId = winnerId;
    }

    public int getMatchId() {
        return matchId;
    }

    public int getPlayer1Id() {
        return player1Id;
    }

    public int getPlayer2Id() {
        return player2Id;
    }

    public Date getStartTime() {
        return startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public int getWinnerId() {
        return winnerId;
    }
}
