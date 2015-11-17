# spread
# mode 

# porportion of d/b 



library(Hmisc)
library(lattice)
library(languageR)
library(lme4)

directory <- '/Volumes/SSD Part2/_userDataSSD2/Experiments/kmDissKM/ibexFarm/27_p_sp_uh_pt_iu_v3_wqmos/27_p_sp_uh_pt_iu_v3_wqmos/results'

setwd(directory)


resultfile <- 'trialdata.txt'
columnlist <- c('workerID', 'timestamp', 'IPhash', 'trialtype', 'stepC', 'stim', 'context', 'resp', 'RT', 'disorder', 'lang', 'headphones', 'buttons')
results <- read.delim(resultfile, header = FALSE, col.names = columnlist)

# results <- read.delim(resultfile, header = FALSE)

head(results)


length(unique(results$workerID))





computerproblem <- c('')
results <- results[!(results $workerID %in% computerproblem), ]
results $workerID <- factor(results $workerID)








excluded <- results[(results$disorder != 'disorderno' | results$lang != 'eng' | results$headphones != 'headphoneyes'), ]



results <- results[(results$disorder == 'disorderno' & results$lang == 'eng' & results$headphones == 'headphoneyes'), ]
results $workerID <- factor(results $workerID)




subjs <- unique(results$workerID)
length(subjs)








results <- results[ , c('workerID', 'trialtype', 'stepC', 'context', 'stim', 'resp', 'RT', 'buttons')]








results$dummy <- 1



results$RTadj <- results$RT
results$RTadj <- ifelse(results$context == 'b', results$RT-(0.13030976466579725 * 1000), results$RT-(0.2897495590828924 * 1000))

# # 0.20640589569161-0.18680883397535722 = 0.01959706171625

# # 0.01959706171625 before zero crossing before [p-t] continuum

# # 0.3658390022675737 - 0.01959706171625 = 0.34624194055132







head(results)








results $respNum <- ifelse(results $resp == 'P', 0, 
                           ifelse(results $resp == 'T', 1, 5))


head(results)




duration <- NULL
for (s in subjs) {
	subj.results <- results[results$workerID == s, ]
	xtab <- xtabs( ~ stim, data = subj.results)
	print(s)
	howlong <- sum(subj.results$RT)/1000/30
	print(howlong)
	duration <- c(duration, howlong)
	# print( length(subj.results$resp) )
}
duration
summary(duration)







tfamily <- 'DTLArgoT'
tiles <- c(5, 6)




results$RTadj
summary(results$RTadj)





par(family = tfamily)
plot(results$RTadj, pch=16, cex=0.6)
plot(results$RTadj, typ='l')
hist(results$RTadj)
hist(results$RTadj, breaks='Scott')
hist(results$RTadj, breaks='FD')



####################
## practice
####################




plot(results$RTadj[results$trialtype == 'p'], pch=16, cex=0.6)
plot(results$RTadj[results$trialtype == 'p'], typ='l')


xtab <- xtabs( ~ resp, data = results[results$trialtype == 'p', ])
barplot(xtab)

summary(results$RTadj[results$trialtype == 'p'])


par(mfrow= tiles, mar=c(1.9, 2, 1, 0.5), cex=0.5, family = tfamily)
for (s in subjs) {
	s.result <- results[ results$workerID == s & results$trialtype == 'p', ]
	# plot(s.result$RTadj, main=s,typ='l', lwd='1.5', col='blue')
	plot(s.result$RTadj, main=s, ylim=c(0, max(results $RTadj)), typ='l', lwd='1.5', col='blue')
}


results <- results[results $trialtype == 't', ]


####################






# ## remove extreme slow (6289.3262076)
# results <- results[results $RTadj < 6288, ]
# results[results $RTadj > 6287, ]



par(family = tfamily)
plot(results$RTadj, pch=16, cex=0.5, col='darkblue')
plot(results$RTadj, typ='l', col='darkblue')


plot(sort(results$RTadj), pch=16, cex=0.6, col='darkblue')




par(family = tfamily)
xtab <- xtabs( ~ resp, data = results)
barplot(xtab)



summary(results$RTadj)



range(results$RTadj)
range(results$RTadj)*1.1


## RTs
par(mfrow= tiles, mar=c(1.9, 2, 2, 0.5), cex=0.4, family = tfamily)
for (s in subjs) {
	s.result <- results[ results$workerID == s, ]
	print(dim(s.result)[1])
	plot(s.result$RTadj, main=s, ylim=c(-200, 7000), typ='l', col='darkblue')
	abline(0, 0)
}


## responses
par(mfrow= tiles, mar=c(1.9, 2, 2, 0.5), cex=0.4, family = tfamily)
for (s in subjs) {
	s.result <- results[ results$workerID == s, ]
	# print(dim(s.result)[1])
	plot(s.result$respNum, main=s, ylim=c(-0.5, 5.5), pch=16, col='darkblue')
}




dim(s.result)





par(mfrow= tiles, mar=c(1.9, 2, 2, 0.5), cex=0.5, family = tfamily)
for (s in subjs) {
	s.result <- results[ results$workerID == s, ]
	xtab <- xtabs( ~ resp, data = s.result)
	barplot(xtab, ylim=c(0, 300), main=s)
	print(xtab)
}



look at:
# AOTCPS24JM5DQ
# A1UNJWWSAB1D59
# A21QMMJH0SG779




percentNoResp <- NULL
par(mfrow= tiles, mar=c(1.9, 2, 2, 0.5), cex=0.5, family = tfamily)
for (s in subjs) {
	s.result <- results[ results$workerID == s, ]
	xtab <- xtabs( ~ resp, data = s.result)
	barplot(xtab, ylim=c(0, 300), main=s)
	# print(xtab)
	noResp <- xtab['NULL'] / sum(xtab) * 100
	percentNoResp <- c(percentNoResp, noResp)
	print(s)
	print(noResp)
}



## percent no response
par(mar=c(10, 6, 2, 1), family = tfamily, cex=0.48)
barplot(percentNoResp, names.arg=subjs, ylim=c(0, 5), las=2, space=0.2, legend.text=FALSE)
abline(mean(percentNoResp), 0, col='red')
abline(median(percentNoResp), 0, col='blue')



## all responses
par(mar=c(9, 6, 2, 1), family = tfamily, cex=0.4)
xtab <- xtabs( ~ resp + workerID, data = results)
barplot(xtab, las=2, space=0.2, legend.text=TRUE)



#############################################
## remove folks who didnt respond
#############################################



alotoftimeouts <- c(
                    ''# # 34.92647
)


resultsGood <- results
subjsGood   <- unique(resultsGood $workerID)




#############################################
## exclude no response
#############################################



resultsNoResponse <- resultsGood[resultsGood$resp == 'NULL', ]
dim(resultsNoResponse)



resultsRespGood <- resultsGood[resultsGood$resp != 'NULL', ]
resultsRespGood $resp <- factor(resultsRespGood $resp)
dim(resultsRespGood)



summary(resultsRespGood $RTadj)


par(family = tfamily)
plot(resultsRespGood $RTadj, pch=16, cex=0.1)
abline(225, 0, col='blue')
center <- mean(resultsRespGood $RTadj) * 0.5 + median(resultsRespGood $RTadj) * 0.5
abline(center, 0, col='red', lwd=2)
abline(3700, 0, col='black')
points(resultsRespGood $RTadj, pch=16, cex=0.5)


plot(resultsRespGood $RTadj, typ='l')


hist(resultsRespGood $RTadj)
hist(resultsRespGood $RTadj, breaks='Scott')
# hist(resultsRespGood $RTadj, breaks='FD')


borders <- c(2, 2, 1.2, 1)
text.size <- 0.4

par(mfrow=tiles, mar=borders, cex=text.size, family=tfamily)
for (s in subjsGood) {
	print(s)
	s.result <- resultsRespGood[ resultsRespGood $workerID == s, ]
	plot(s.result$RTadj, main=s, ylim=c(-500, 3900), pch=16, cex=0.2)
	points(s.result$RTadj, pch=16, cex=0.8)
	center <- mean(s.result$RTadj) * 0.5 + median(s.result$RTadj) * 0.5
	abline(225, 0, col='blue')
	abline(center, 0, col='red', lwd=2)
	print(center)
	# print(dim(s.result))
}

12% of your response times were just 200 milliseconds after the onset of the acoustic information for 'p' and 't'. The brain needs about 200 milliseconds to just make a decision and takes even longer to click a mouse button (& the internet interface should be make this slower). 20% of your RTs were under 300ms, your median RT was 505ms. Unlike most people, you didnt seem to distinguish between p & t sounds. It seems you were just pressing buttons fast to get through the experiment rather than listening.


28% of your response times were just 200 milliseconds after the onset of the acoustic information for 'p' and 't'. (Your median RT was 516ms.) The human brain needs about 200 milliseconds to just make a decision, and it takes an even longer time to physically click a mouse button (& the internet interface should be make this slower). Unlike other people, you mostly just pressed one response. It appears that you were just pressing buttons fast in order to get through the experiment rather than attending to the stimuli.


10% of your response times were before the onset of the acoustic information for 'p' and 't'. And, 28% of your responses were just 200 milliseconds after this onset. The human brain generally needs about 200 milliseconds to just make a decision, and it takes an even longer time to physically click a mouse button (and the internet interface should be make this slower). So, it appears that you were just pressing buttons fast in order to get through much of the experiment rather than attending to the stimuli.

Your median respond time was 143 milliseconds after the onset of the acoustic information for 'p' and 't'. The human brain generally needs about 200 milliseconds to just make a decision and it takes an even longer time to click a mouse button. So, it appears that you were just pressing buttons fast in order to get through the experiment.

Your median respond time was 369 milliseconds before the onset of the acoustic information for 'p' and 't'. This means you were pressing buttons before you even heard the sound you were supposed to be listening for.



## for individual
s <- 'A1NQLW1UROVH81'  # (too fast, rejected)
s <- 'A36T586P6DLRBF'  # (too fast, rejected)


s.result <- resultsRespGood[ resultsRespGood $workerID == s, ]
# plot(s.result$RTadj, main=s, pch=16, cex=0.2)
# plot(s.result$RTadj, main=s, typ='l')
plot(s.result$RTadj, main=s, ylim=c(-500, 4500), pch=16, cex=0.2)
points(s.result$RTadj, pch=16, cex=0.8)
center <- mean(s.result$RTadj) * 0.5 + median(s.result$RTadj) * 0.5
abline(225, 0, col='blue')
abline(center, 0, col='red', lwd=2)
summary(s.result$RTadj)
summary(s.result$RT)


median(s.result[s.result$context == 'sp', ]$RT) 
= 434
median(s.result[s.result$context == 'b', ]$RT) 
= 510
mean(s.result[s.result$context == 'sp', ]$RT) 
= 597.9012
mean(s.result[s.result$context == 'b', ]$RT) 
= 744.6049




head(s.result)

dim(s.result[s.result$RTadj <= 300, ])
dim(s.result[s.result$RTadj > 300, ])
dim(s.result[s.result$RTadj <= 200, ])
dim(s.result[s.result$RTadj > 200, ])
dim(s.result[s.result$RTadj <= 1, ])
dim(s.result[s.result$RTadj > 1, ])
68/(68 + 268)
41/(41 + 295)
33/(33 + 297)




problempeople <- c('A1NQLW1UROVH81', 'A36T586P6DLRBF')
resultsRespGood <- resultsRespGood[!(resultsRespGood $workerID %in% problempeople), ]
resultsRespGood $workerID <- factor(resultsRespGood $workerID)

subjsGood <- unique(resultsRespGood $workerID)


resultsRespGood$resp <- factor(resultsRespGood$resp)




#############################################
## exclude faster than 200ms & practice items
#############################################



responses <- resultsRespGood[resultsRespGood$RTadj > 300, ]
responses$RTlog <- log(responses$RTadj)






summary(responses $RTadj)
summary(responses $RTlog)


par(family = tfamily)
plot(responses $RTlog, pch=16, cex=0.4)
abline(log(225), 0, col='blue')
center <- mean(responses $RTlog) * 0.5 + median(responses $RTlog) * 0.5
abline(center, 0, col='red', lwd=2)


plot(responses $RTlog, typ='l')



hist(responses $RTadj)
hist(responses $RTadj, breaks='Scott')
# hist(responses $RTadj, breaks='FD')


hist(responses $RTlog)
hist(responses $RTlog, breaks='Scott')
# hist(responses $RTlog, breaks='FD')






par(mfrow=tiles, mar=borders, cex=text.size, family=tfamily)
for (s in subjsGood) {
	s.result <- responses[ responses $workerID == s, ]
	plot(s.result$RTlog, main=s, ylim=c(5, 8.5), pch=16, cex=0.5)
	# plot(s.result$RTlog, main=s, xlim=c(0, 212), ylim=c(4, 7.9), typ='l')
	abline(log(225), 0, col='blue')
	center <- mean(s.result$RTlog) * 0.5 + median(s.result$RTlog) * 0.5
	abline(center, 0, col='red', lwd=2)
	print(dim(s.result))
}



par(mfrow= tiles, mar= borders, cex= text.size, family = tfamily)
for (s in subjsGood) {
	s.result <- responses[ responses $workerID == s, ]
	xtab <- xtabs( ~ resp, data = s.result)
	barplot(xtab, ylim=c(0, 300), main=s)
	print(xtab)
}










#############################################
## ID function
#############################################




head(responses)



xtab <- xtabs( ~ workerID  + stepC, data = responses)
xtab


length(unique(responses$workerID))





xlabel <- '1 [p] – [t] 9'
ylabel <- 'prop. ‘t’ resp.'


borders <- c(4.1,4.3,1.5,0.4)

responses $dummy <- 1

length(responses $respNum)
length(responses $stepC)
length(responses $dummy)





par(mfrow=c(1,1), mar= borders, cex.lab=1.2, cex.axis=1.1, family = tfamily)
interaction.plot(responses$stepC, responses $dummy, responses $respNum, xlab=xlabel, ylab=ylabel, legend=TRUE, ylim=c(0, 1), main='pooled', lwd=2.3)
vm   <- tapply(responses $respNum, responses $stepC, mean)
vsd  <- tapply(responses $respNum, responses $stepC, sd)
vsem <- vsd / sqrt( length(subjsGood) ) ##* 1.96
errbar( c(1:length(vm)), vm, vm + vsem, vm - vsem, add=TRUE, pch="")


borders <- c(4, 4, 1.2, 0.3)
text.size <- 0.35
par(mfrow= tiles, mar= borders, cex= text.size, family = tfamily)
for (s in subjsGood) {
	s.result <- responses[ responses $workerID == s, ]
	ccol <- 'darkblue'
	interaction.plot(s.result $stepC, s.result $dummy, s.result $respNum, xlab=xlabel, ylab=ylabel, legend=FALSE, ylim=c(0, 1), main=s, lwd=2, col= ccol)
}








problempeople <- c('')
resultsRespGood <- resultsRespGood[!(resultsRespGood $workerID %in% problempeople), ]
resultsRespGood $workerID <- factor(resultsRespGood $workerID)

subjsGood <- unique(resultsRespGood $workerID)


resultsRespGood$resp <- factor(resultsRespGood$resp)










#############################################
## % correct
#############################################


head(responses)

sort(unique(responses$stepC ))


endpoints <- responses[responses$stepC == 1 | responses$stepC == 18, ]
endpoints$stepC <- factor(endpoints$stepC)




xtab <- xtabs( ~ resp + stepC, data = endpoints)
xtab




subjCorrect <- NULL
subjWrong   <- NULL
par(mfrow= tiles, mar= borders, cex= text.size, family = tfamily)
for (s in subjsGood) {
	s.result <- endpoints[ endpoints $workerID == s, ]
	xtab <- xtabs( ~ resp + stepC, data = s.result)
	totalp <- sum(xtab[ , 1])
	correctp <- xtab['P', 1] 
	totalt <- sum(xtab[ , 2])
	correctt <- xtab['T', 2] 
	percentcorrectp <- correctp / totalp * 100
	percentcorrectt <- correctt / totalt * 100
	print(s)
	# print( percentcorrect )
	print( xtab )
	# barplot( percentcorrectp, ylim=c(0, 100), main=s)
	# if (percentcorrectp > 65 & percentcorrectt > 65 ) {
	if (percentcorrectp > 70 & percentcorrectt > 70 ) {
		subjCorrect <- c(subjCorrect, s)
	} else {subjWrong <- c(subjWrong, s)}
}
length(subjCorrect)
length(subjWrong)




tiles <- c(5, 4)
borders <- c(4, 4, 1.2, 0.3)

text.size <- 0.35


## correct
par(mfrow= tiles, mar= borders, cex= text.size, family = tfamily)
for (s in subjCorrect) {
	s.result <- responses[ responses $workerID == s, ]
	ccol <- 'darkblue'
	interaction.plot(s.result $stepC, s.result $dummy, s.result $respNum, xlab=xlabel, ylab=ylabel, legend=FALSE, ylim=c(0, 1), main=s, lwd=2, col= ccol)
}




## wrong
par(mfrow=c(2,2), mar= borders, cex= text.size, family = tfamily)
for (s in subjWrong) {
	s.result <- responses[ responses $workerID == s, ]
	ccol <- 'darkblue'
	interaction.plot(s.result $stepC, s.result $dummy, s.result $respNum, xlab=xlabel, ylab=ylabel, legend=FALSE, ylim=c(0, 1), main=s, lwd=2, col= ccol)
}




xtab <- xtabs( ~ resp + stepC, data = endpoints)
xtab







responsesCorrect <- responses[(responses$workerID %in% subjCorrect), ]
# responsesCorrect <- responses



length(unique(responsesCorrect $workerID))



borders <- c(4.1,4.3,1.5,0.4)
par(mfrow=c(1,1), mar= borders, cex.lab=1.2, cex.axis=1.1, family = tfamily)
interaction.plot(responsesCorrect $stepC, responsesCorrect $dummy, responsesCorrect $respNum, xlab=xlabel, ylab=ylabel, legend=FALSE, ylim=c(0, 1), main='pooled', lwd=2.3)
vm   <- tapply(responsesCorrect $respNum, responsesCorrect $stepC, mean)
vsd  <- tapply(responsesCorrect $respNum, responsesCorrect $stepC, sd)
vsem <- vsd / sqrt( length(subjCorrect) ) ##* 1.96
errbar( c(1:length(vm)), vm, vm + vsem, vm - vsem, add=TRUE, pch="")




head(responsesCorrect)

borders <- c(4.1,4.3,1.5,0.4)
par(mfrow=c(1,1), mar= borders, cex.lab=1.2, cex.axis=1.1, family = tfamily)
interaction.plot(responsesCorrect $stepC, responsesCorrect $context, responsesCorrect $respNum, xlab=xlabel, ylab=ylabel, legend=TRUE, ylim=c(0, 1), main='pooled', lwd=2.3, col=1:7, lty='solid')


borders <- c(4.1,4.3,1.5,0.4)
par(mfrow=c(1,1), mar= borders, cex.lab=1.2, cex.axis=1.1, family = tfamily)
interaction.plot(responsesCorrect $context, responsesCorrect $stepC, responsesCorrect $respNum, xlab='', ylab=ylabel, legend=TRUE, ylim=c(0, 1), main='pooled', lwd=2.3, col=1:7)


borders <- c(4.1,4.3,1.5,0.4)
par(mfrow=c(1,1), mar= borders, cex.lab=1.2, cex.axis=1.1, family = tfamily)
interaction.plot(responsesCorrect $context, responsesCorrect $dummy, responsesCorrect $respNum, xlab=xlabel, ylab=ylabel, legend=TRUE, ylim=c(0, 1), main='pooled', lwd=2.3, col=1:7)

head(responsesCorrect)






par(mfrow=c(4, 5), mar= borders, cex= 0.4, family = tfamily)
for (s in subjCorrect) {
	s.result <- responsesCorrect[ responsesCorrect $workerID == s, ]
	ccol <- 'darkblue'
	interaction.plot(s.result $stepC, s.result $dummy, s.result $respNum, xlab=xlabel, ylab=ylabel, legend= TRUE, ylim=c(0, 1), main=s, lwd=2, col=1:7, lty='solid')
}











head(responsesCorrect)

responsesCorrect[responsesCorrect $workerID == s, ]
xtabs( ~ stepC, data = responsesCorrect)
xtabs( ~ respNum, data = responsesCorrect)
xtabs( ~ respNum + stepC, data = responsesCorrect)



subjrank <- NULL
for (s in subjCorrect) {
	s.result <- responsesCorrect[ responsesCorrect $workerID == s, ]
	iursp <- xtabs( ~ respNum + stepC, data = s.result)
	iutot <- sum(iursp[ , c('7', '8', '9')])
	ursp <- sum(iursp['0', c('7', '8', '9')])
	irsp <- sum(iursp['1', c('7', '8', '9')])
	ipercent <- irsp / iutot * 100
	subjrank <- c(subjrank, ipercent)

}


subjrankdf <- data.frame(s= subjCorrect, ip = subjrank)

subjrankdf <- subjrankdf[order(subjrankdf$ip), ]




par(mfrow=c(4, 5), mar= borders, cex= 0.3, family = tfamily)
for (s in subjrankdf$s) {
	s.result <- responsesCorrect[ responsesCorrect $workerID == s, ]
	ccol <- 'darkblue'
	interaction.plot(s.result $stepC, s.result $dummy, s.result $respNum, xlab=xlabel, ylab=ylabel, legend= TRUE, ylim=c(0, 1), main=s, lwd=2, col=1:7, lty='solid')
}






## sp=red, b=black
par(mfrow=tiles, mar= borders, cex= 0.5, family = tfamily)
for (s in subjrankdf$s) {
	print(s)
	s.result <- responsesCorrect[ responsesCorrect $workerID == s, ]
	ccol <- 'darkblue'
	interaction.plot(s.result $stepC, s.result $context, s.result $respNum, xlab=xlabel, ylab=ylabel, legend= TRUE, ylim=c(0, 1), main=s, lwd=2, col=1:7, lty='solid')
}







weird <- c('')
responsesCorrect <- responsesCorrect[!(responsesCorrect $workerID %in% weird), ]
responsesCorrect $workerID <- factor(responsesCorrect $workerID)

subjCorrect <- unique(responsesCorrect $workerID)


responsesCorrect $resp <- factor(responsesCorrect $resp)




borders <- c(4.1,4.3,1.5,0.4)
par(mfrow=c(1,1), mar= borders, cex.lab=1.2, cex.axis=1.1, family = tfamily)
interaction.plot(responsesCorrect $stepC, responsesCorrect $context, responsesCorrect $respNum, xlab=xlabel, ylab=ylabel, legend=TRUE, ylim=c(0, 1), main='pooled', lwd=2.3, col=1:7, lty='solid')




borders <- c(4.1,4.3,1.5,0.4)
par(mfrow=c(1,1), mar= borders, cex.lab=1.2, cex.axis=1.1, family = tfamily)
interaction.plot(responsesCorrect $stepC, responsesCorrect $dummy, responsesCorrect $respNum, xlab=xlabel, ylab=ylabel, legend=TRUE, ylim=c(0, 1), main='pooled', lwd=2.3, col=1:7, lty='solid')








########
## mixed effects modeling
########



head(responsesCorrect)


sort(unique(responsesCorrect$stepC))
mean(unique(responsesCorrect$stepC))
responsesCorrect$stepCc <- responsesCorrect$stepC - mean(unique(responsesCorrect$stepC))
responsesCorrect$stepCc <- ( responsesCorrect$stepCc - mean(responsesCorrect$stepCc) ) / sd(responsesCorrect$stepCc)
mean(responsesCorrect$stepCc )
median(responsesCorrect$stepCc )


## b = -1, sp = +1
responsesCorrect$contextc <- ifelse(responsesCorrect$context == 'b', -0.5, 0.5)
responsesCorrect$contextc <- responsesCorrect$contextc - mean(unique(responsesCorrect$contextc))
responsesCorrect$contextc <- ( responsesCorrect$contextc - mean(responsesCorrect$contextc) ) / sd(responsesCorrect$contextc)
mean(responsesCorrect$contextc)
median(responsesCorrect$contextc)




rsp <- lmer(respNum ~ stepCc + contextc + (1 | workerID), family = "binomial", data = responsesCorrect )
summary(rsp)








rsp.slopes <- lmer(respNum ~ stepCc + contextc + (1 + stepCc + contextc | workerID), family = "binomial", data = responsesCorrect )	
summary(rsp.slopes)



anova(rsp, rsp.slopes)






rsp.ia <- lmer(respNum ~ stepCc * contextc + (1 | workerID), family = "binomial", data = responsesCorrect )
summary(rsp.ia)


anova(rsp, rsp.ia)




rsp.ia.slopes <- lmer(respNum ~ stepCc * contextc + (1 + stepCc * contextc | workerID), family = "binomial", data = responsesCorrect )
summary(rsp.ia.slopes)


anova(rsp.ia, rsp.ia.slopes)
anova(rsp.slopes, rsp.ia.slopes)



